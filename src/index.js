'use strict'

const YAML = require('yaml')
const fs = require('fs')
const marked = require('marked')
const handlebars = require('handlebars')

const linksRawText = fs.readFileSync('links-test.yaml', 'utf-8')
const links = (() => {
  const data = YAML.parse(linksRawText)
  convertDescriptionsFromMarkdownToHTML(data)
  addUsedTagsFieldToCategories(data)
  populateTaglessEntries(data)
  return data
})()

// Takes a category from the link structure and returns a list of all the tags 
// used within that category
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
function addUsedTagsFieldToCategories(links) {
  for (const category of Object.values(links.categories)) {
    category['used-tags'] = getUsedTags(category)
  }
  return links
}

// For any entry with no 'tags' field or has an empty tag list []
// Replace it with the 'All' tag to prevent it from being filtered
// NOTE: If this is called BEFORE 'addUsedTagsFieldToCategories'
//   then the category will also get the All tag and will never be filtered
//   If called AFTER, then the category will be hidden even if some
//   elements with the All tag are still under it
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
const output = rootTemplate(links)

fs.mkdirSync('build', {recursive: true})


fs.writeFileSync('build/index.html', output, (err) => {
  console.error(`Failed to write output HTML file: ${err.message}`)
})

const filesToCopy = ['style.css', 'noscript-style.css', 'filter-logic.js']
filesToCopy.forEach(filename => {
  fs.copyFileSync(`src/${filename}`, `build/${filename}`)
})
