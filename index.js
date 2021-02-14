'use strict'

const YAML = require('yaml')
const fs = require('fs')
const marked = require('marked')
const handlebars = require('handlebars')

const linksRawText = fs.readFileSync('./links-test.yaml', 'utf-8')
const links = (() => {
  const data = YAML.parse(linksRawText)
  const _data = convertDescriptionsFromMarkdownToHTML(data)
  console.log(_data)
  return addUsedTagsFieldToCategories(_data)
})()

function getUsedTags(category) {
  const usedTags = new Set()
  if (category.overview) {
    for (const entry of category.overview) {
      entry.tags.forEach(tag => usedTags.add(tag))
    }
  }
  if (category.entries) {
    for (const entry of category.entries) {
      entry.tags.forEach(tag => usedTags.add(tag))
    }
  }
  return [...usedTags]
}

function addUsedTagsFieldToCategories(links) {
  for (const category of Object.values(links.categories)) {
    category['used-tags'] = getUsedTags(category)
  }
  return links
}

console.log(links)

// Crawls over the structure of links and converts descriptions
// from markdown to inline html before templating
function convertDescriptionsFromMarkdownToHTML(links) {
  if (links['page-title'])
    links['page-title'] = marked.parseInline(links['page-title'])
  if (links['page-description'])
    links['page-description'] = marked.parseInline(links['page-description'])
  Object.values(links.categories).forEach(category => {
    const { type, overview, entries } = category
    if (type !== 'list') return
    if (overview != null) {
      overview.forEach(entry => {
        if (entry.text) 
          entry.text = marked.parseInline(entry.text)
      })
    }
    if (entries != null) {
      entries.forEach(entry => {
        if (entry.desc)
          entry.desc = marked.parseInline(entry.desc)
      })
    }
  })
  return links
}



const pageTitleRaw = fs.readFileSync('./templates/page-title-template.hbs', 'utf-8')
const categoryOverviewRaw = fs.readFileSync('./templates/category-overview-template.hbs', 'utf-8')
const cateogryOverviewEntryRaw = fs.readFileSync('./templates/category-overview-entry-template.hbs', 'utf-8')
const documentHeaderRaw = fs.readFileSync('./templates/html-document-header.hbs', 'utf-8')
const listTemplateRaw = fs.readFileSync('./templates/list-template.hbs', 'utf-8')
const listEntryTemplateRaw = fs.readFileSync('./templates/list-entry-template.hbs', 'utf-8')
const rootTemplateRaw = fs.readFileSync('./templates/root-template.hbs', 'utf-8')

handlebars.registerHelper('link', (text, url) => {
  const escapedURL = handlebars.escapeExpression(url)
  const escapedText = handlebars.escapeExpression(text)
  return new handlebars.SafeString(`<a href="${escapedURL}">${escapedText}</a>`)
});

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

const rootTemplate = handlebars.compile(rootTemplateRaw)

const output = rootTemplate(links)

fs.writeFileSync('out.html', output, (err) => {
  console.error(`Failed to write output HTML file: ${err.message}`)
})