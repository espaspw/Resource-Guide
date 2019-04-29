const fs = require('fs');
const {Eager} = require('denotational');
const {isNotInCommon} = require('./src/utils');


const data = require('./src/index');
const style = require('./src/components/style');
const sieveToLabel = require('./src/components/chapter');

const tags = (Eager(Array.from(data.values()))
  .flatten(1) // All sections of links -> array of links
  .map(x => x.tags) // Links -> array of array of tags
  .flatten(1) // 2d array of tags -> 1d
  .unique()
  .val()
);
const chapters = Array.from(data.keys());

const strings = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <link rel="stylesheet" href="style.css">
  <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
</head>
<body>
<div class="splitview">

  <nav>
    <div class="navbar__drop-menu" onclick="">Sections</div>
    <div class="navbar__container">
      <a href="#All" id="navbar__main-btn">All</a></td>
      <a href="#Cantonese">Cantonese</a>
      <a href="#Mandarin">Mandarin</a>
      <a href="#Other">Other</a>
      <a href="#English">English</a>
      ${Eager(tags).sieve(isNotInCommon).map(label => `<a href="#${label}">${label}</a>`).val().join('')}
    </div>
    <div class="navbar__drop-menu__flexbox">
      <div class="navbar__drop-menu__container">
          <a href="#All" id="navbar__main-btn">All</a></td>
          <a href="#Cantonese">Cantonese</a>
          <a href="#Mandarin">Mandarin</a>
          <a href="#Other">Other</a>
          <a href="#English">English</a>
          ${Eager(tags).sieve(isNotInCommon).map(label => `<a href="#${label}">${label}</a>`).val().join('')}
        </div>
    </div>
  </nav>
  
  <div class="responsive-spacer"></div>
  <div class="main-container">
  <main>${
  tags.map(label => `
    <section id="${label}">${
    Eager(chapters)
    .map(chapter => `
      ${sieveToLabel(data, chapter, label)}`
    )
    .sieve(x => x.trim() !== '') // remove empty lines
    .val()
    .join('')}
    </section>
` ).join('')}
  </main>
  </div>
</div>
</body>
<script>
  // Redirects to #All tag on page load as text is hidden on default index
  window.onload = () => {
    window.location.href = "#All";
    window.scrollTo(0,0);
  }
  // Scrolls to top after using fragment ID
  window.onhashchange = () => {
    window.scrollTo(0,0);
  }
</script>
</html>`;

console.log(strings);
// return;

// Overwrites file by default
fs.writeFile('./index.html', strings, function(err) {
  if (err) {
    return console.log(err);
  }
  console.log('Success');
});

// console.log(a);