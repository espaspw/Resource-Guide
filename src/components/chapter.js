module.exports = function chapter(map, heading, label) {
  const links = (label === 'All')
    ? map.get(heading)
    : map.get(heading).filter(entry => entry.tags.some(tag => tag === label));
  
  const string = links.length < 1
    ? '' // If no links, then do not display heading
    : `<article id="${heading}">
        <h1>${heading}</h1>
        <ul>${links.map(link => `
          <li>${link.body}</li>
        `).join('')}</ul>
      </article>`;
  return string;
};