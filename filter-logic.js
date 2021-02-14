'use strict'

const filterButtons = document.querySelectorAll('.navbar .navbar__section__input')
const checkboxes = document.querySelectorAll('.navbar input')

filterButtons.forEach(elem => {
  elem.addEventListener('click', (event) => {
    if (event.target !== elem) return
    elem.childNodes[1].checked = !elem.childNodes[1].checked
    handleFilterChange()
  })
})

checkboxes.forEach(elem => {
  elem.addEventListener('change', handleFilterChange)
})



const entries = document.querySelectorAll('.taggable')

// Tests whether a domElem contains all the tags in a tag list
function testFilter(domElem, tagList) {
  for (const tag of tagList) {
    if (!domElem.classList.contains(tag))
      return false
  }
  return true
}

function handleFilterChange() {
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