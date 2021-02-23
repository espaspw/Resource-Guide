'use strict'

const showFiltersButton = document.querySelector('.show-filters-button')
const navbar = document.querySelector('.navbar')
const responsiveSpacer = document.querySelector('.responsive-spacer')
const filterButtons = document.querySelectorAll('.navbar .navbar__section__input')
const checkboxes = document.querySelectorAll('.navbar input')
const entries = document.querySelectorAll('.taggable')

filterButtons.forEach(elem => {
  elem.addEventListener('click', (event) => {
    if (event.target !== elem) return
    const inputChild = getFirstInputChildNode(elem)
    inputChild.checked = !inputChild.checked
    handleFilterChange()
  })
})

checkboxes.forEach(elem => {
  elem.checked = false;
  elem.addEventListener('change', handleFilterChange)
})

// Returns the first child element node of type input
function getFirstInputChildNode(elemNode) {
  for (const child of elemNode.childNodes) {
    if (child.tagName === 'INPUT') return child
  }
  return null
}

// Tests whether a domElem contains all the tags in a tag list
function testFilter(domElem, tagList) {
  for (const tag of tagList) {
    if (!domElem.classList.contains(tag) && !domElem.classList.contains('Tag-All'))
      return false
  }
  return true
}

function handleFilterChange() {
  // Set highlighting for active filters
  filterButtons.forEach(elem => {
    const inputChild = getFirstInputChildNode(elem)
    if (inputChild.checked) elem.classList.add('--active')
    else elem.classList.remove('--active')
  })
  // Gathers all selected checkboxes into a set containing tag strings
  const filterValues = new Set()
  checkboxes.forEach(elem => {
    if (elem.checked)
      filterValues.add(`Tag-${elem.name}`)
  })
  // Checks whether to hide a taggable element by checking selected tags
  entries.forEach(entry => {
    if (testFilter(entry, filterValues)) 
      entry.classList.remove('--hidden')
    else
      entry.classList.add('--hidden')
  })
}


let isNavbarVisible = true

showFiltersButton.addEventListener('click', (event) => {
  isNavbarVisible = !isNavbarVisible
  showFiltersButton.textContent = isNavbarVisible ?  'Hide Filters' : 'Show Filters'
  navbar.classList.toggle('--hidden')
  responsiveSpacer.classList.toggle('--hidden')
})