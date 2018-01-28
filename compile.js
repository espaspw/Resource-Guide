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
  <style>
${style}
  </style>
</head>
<body>
  <nav><table><tr>
    <td><a href="#All">All</a></td>
    <td><a href="#Cantonese">Cantonese</a></td>
    <td><a href="#Mandarin">Mandarin</a></td>
    <td><a href="#Other">Other</a></td>
    <td><a href="#English">English</a></td>${
  Eager(tags).sieve(isNotInCommon).map(label => `
    <td><a href="#${label}">${label}</a></td>`
  ).val().join('')}
  </tr></table></nav>
  

  <div class="space-for-nav">_</div>

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
</body>
</html>`;

console.log(strings);
// return;

// Overwrites file by default
fs.writeFile("./index.html", strings, function(err) {
  if (err) {
    return console.log(err);
  }
  console.log("Success");
});

// console.log(a);