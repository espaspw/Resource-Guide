'use strict'

const YAML = require('yaml')
const fs = require('fs')
const marked = require('marked')
const handlebars = require('handlebars')
const minify = require('minify')

// Takes a category from the link structure and returns a list of all the tags 
// used within that category
// Category -> [TagString]
function getUsedTags(category) {
  const usedTags = new Set()
  if (category.overview) {
    for (const entry of category.overview) {
      if (entry.tags)
        entry.tags.forEach(tag => usedTags.add(tag))
    }
  }
  if (category.entries) {
    for (const entry of category.entries) {
      if (entry.tags)
        entry.tags.forEach(tag => usedTags.add(tag))
    }
  }
  return [...usedTags]
}

// Takes a 'links' structure and adds to each category a 'used-tags' field
// which is a list of all the tags used under that category
// Input is changed by side effects
function addUsedTagsFieldToCategories(links) {
  for (const category of Object.values(links.categories)) {
    category['used-tags'] = getUsedTags(category)
  }
  return links
}

// Takes a special 'All' tag and gets the associated list of tags
// For example, if avaliable-tags has the pair <Device, [Computer, Mobile]>
// then the special allTagName 'Device-All' will return [Computer, Mobile]
// ParsedYAML -> TagString -> [TagString] 
function expandAllTag(links, allTagName) {
  const tagGroup = allTagName.slice(0, -4)
  const tagList = links['avaliable-tags'][tagGroup]
  if (tagList == null)
    throw new Error(`All-Tag '${allTagName}' does not have an 'avaliable-tags' entry associated with it`)
  return tagList
}

// For any entry with special 'All' tags such as 'Language-All', replace with
// the tags under that tag group, such as 'Cantonese', 'Mandarin', etc...
// Input is changed with side effects
function expandAllTagsInEntries(links) {
  for (const category of Object.values(links.categories)) {
    if (category.overview) {
      for (const entry of category.overview) {
        if (entry.tags == null) continue
        entry.tags = entry.tags.flatMap(
          tag => tag.endsWith('-All') ? expandAllTag(links, tag) : tag
        )
      }
    }
    if (category.entries) {
      for (const entry of category.entries) {
        if (entry.tags == null) continue
        entry.tags = entry.tags.flatMap(
          tag => tag.endsWith('-All') ? expandAllTag(links, tag) : tag
        )
      }
    }
  }
  return links;
}

// For any entry with no 'tags' field or has an empty tag list []
// Replace it with the 'All' tag to prevent it from being filtered
// NOTE: If this is called BEFORE 'addUsedTagsFieldToCategories'
//   then the category will also get the All tag and will never be filtered
//   If called AFTER, then the category will be hidden even if some
//   elements with the All tag are still under it
// Input is changed by side effects
function populateTaglessEntries(links) {
  for (const category of Object.values(links.categories)) {
    if (category.overview) {
      for (const entry of category.overview) {
        if (!Array.isArray(entry.tags) || entry.tags.length === 0) {
          entry.tags = ['All']
        }
      }
    }
    if (category.entries) {
      for (const entry of category.entries) {
        if (!Array.isArray(entry.tags) || entry.tags.length === 0) {
          entry.tags = ['All']
        }
      }
    }
  }
  return links;
}


// Crawls over the structure of links and converts descriptions
// from markdown to inline html before templating
// Input is changed by side effects
function convertDescriptionsFromMarkdownToHTML(links) {
  if (links['page-title'])
    links['page-title'] = marked.parseInline(links['page-title'])
  if (links['page-description'])
    links['page-description'] = marked.parseInline(links['page-description'])
  Object.values(links.categories).forEach(category => {
    const { type, overview, entries } = category
    if (overview != null) {
      overview.forEach(entry => {
        if (entry.text) 
          entry.text = marked.parseInline(entry.text)
      })
    }
    if (type === 'list' && entries != null) {
      entries.forEach(entry => {
        if (entry.desc)
          entry.desc = marked.parseInline(entry.desc)
      })
    } else if (type === 'table' && entries != null) {
      entries.forEach(entry => {
        if (entry.rows && Array.isArray(entry.rows)) {
          entry.rows = entry.rows.map(row => marked.parseInline(row))
        }
      })
    }
  })
  return links
}

// Registers templates, partials, and helpers to Handlebars and generates template function
// void -> HandlebarsTemplateDelegate
function getHTMLTemplate () {
  const pageTitleRaw = fs.readFileSync('src/templates/page-title-template.hbs', 'utf-8')
  const categoryOverviewRaw = fs.readFileSync('src/templates/category-overview-template.hbs', 'utf-8')
  const cateogryOverviewEntryRaw = fs.readFileSync('src/templates/category-overview-entry-template.hbs', 'utf-8')
  const documentHeaderRaw = fs.readFileSync('src/templates/html-document-header.hbs', 'utf-8')
  const listTemplateRaw = fs.readFileSync('src/templates/list-template.hbs', 'utf-8')
  const listEntryTemplateRaw = fs.readFileSync('src/templates/list-entry-template.hbs', 'utf-8')
  const tableTemplateRaw = fs.readFileSync('src/templates/table-template.hbs', 'utf-8')
  const rootTemplateRaw = fs.readFileSync('src/templates/root-template.hbs', 'utf-8')
  
  // Joins a URL and text into an HTML anchor string
  handlebars.registerHelper('link', (text, url) => {
    const escapedURL = handlebars.escapeExpression(url)
    const escapedText = handlebars.escapeExpression(text)
    return new handlebars.SafeString(`<a href="${escapedURL}">${escapedText}</a>`)
  });
  
  // Checks whether the category data structure is a 'list' or 'table'
  handlebars.registerHelper('choose-entry-format-partial', (categoryData) => {
    const { key: categoryName, root } = categoryData.data
    return root.categories[categoryName].type
  })
  
  // Takes an array of tagnames and returns a space-separated string of tags with 'Tag-' prepreded
  handlebars.registerHelper('expand-tags', (tags) => {
    if (tags == null) return null;
    return tags.map((tag) => `Tag-${tag}`).join(' ')
  })
  
  handlebars.registerPartial('page-title', pageTitleRaw)
  handlebars.registerPartial('category-overview', categoryOverviewRaw)
  handlebars.registerPartial('category-overview-entry', cateogryOverviewEntryRaw)
  handlebars.registerPartial('document-header', documentHeaderRaw)
  handlebars.registerPartial('list-entry', listEntryTemplateRaw)
  handlebars.registerPartial('list', listTemplateRaw)
  handlebars.registerPartial('table', tableTemplateRaw)
  
  const rootTemplate = handlebars.compile(rootTemplateRaw)
  return rootTemplate
}

// Parses YAML file and outputs HTML file
// YAMLString -> HandlebarsTemplateDelegate -> HTMLString
function buildHTMLOutput (rawYAMLText, htmlTemplate) {
  const data = YAML.parse(rawYAMLText)
  convertDescriptionsFromMarkdownToHTML(data)
  addUsedTagsFieldToCategories(data)
  expandAllTagsInEntries(data)
  populateTaglessEntries(data)
  return htmlTemplate(data)
}

// Parses Links YAML file and inserts into HTML Template
// Output HTML file along with other source CSS and JS files are
// then minified and output into the build folder
function main () {
  const linksRawText = fs.readFileSync('links-test.yaml', 'utf-8')
  const htmlTemplate = getHTMLTemplate()
  const htmlOutput = buildHTMLOutput(linksRawText, htmlTemplate)
  
  // Recursive is used to ensure this function works even if the file already exists
  // (Pretty much just the mkdir -p flag)
  fs.mkdirSync('build', {recursive: true})
  fs.writeFileSync('build/index.html', htmlOutput, (err) => {
    console.error(`Failed to write output HTML file: ${err.message}`)
  })
  minify('build/index.html')
    .then(minifiedHTML => fs.promises.writeFile('build/index.html', minifiedHTML))
    .catch(console.error)
  const filesToCopy = ['style.css', 'noscript-style.css', 'filter-logic.js']
  filesToCopy.forEach(filename => {
    const sourceFileName = `src/${filename}`
    minify(sourceFileName)
      .then(minifiedText => fs.promises.writeFile(`build/${filename}`, minifiedText))
      .catch(console.error)
  })
}

main()
