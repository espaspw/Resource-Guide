const {isNotInCommon} = require('./utils');
const sections = new Map();

// Adds 'Other' if anything other than Cantonese, Mandarin, or English pops up
function setTags(...tags) {
  return (tags.filter(isNotInCommon).length > 0)
    ? tags.concat(['All', 'Other'])
    : tags.concat(['All']);
}

sections.set("Title", [
  { tags: setTags('Mandarin'),
    body: `<a href="https://github.com/Super-Panama-World/Resource-Guide/blob/master/Guide%20to%20Learning%20Chinese.md">Guide to Learning Chinese</a>`},

  { tags: setTags('Mandarin'),
    body: `<a href="http://www.hackingchinese.com/a-guide-to-pinyin-traps-and-pitfalls/">Hacking Chinese’s Guide to Pinyin</a>`},

  { tags: setTags('Mandarin'),
    body: `<a href="https://chinese.yabla.com/chinese-pinyin-chart.php">Yabla Audio Chart</a> [Pinyin][Reference] Southern accent, tones are enunciated so better for learners.`},



  { tags: setTags('Cantonese'),
    body: `<a href="https://chinese.yabla.com/chinese-pinyin-chart.php">Yabla Audio Chart</a> [Pinyin][Reference] Southern accent, tones are enunciated so better for learners.`},
  { tags: setTags('Cantonese'),
    body: `<a href="https://chinese.yabla.com/chinese-pinyin-chart.php">Yabla Audio Chart</a> [Pinyin][Reference] Southern accent, tones are enunciated so better for learners.`},
]);

sections.set("Stuff", [
  { tags: setTags('Hokkien'),
    body: `<a href="https://chinese.yabla.com/chinese-pinyin-chart.php">Yabla Audio Chart</a> [Pinyin][Reference] Southern accent, tones are enunciated so better for learners.`},
  { tags: setTags('Mee'),
    body: `<a href="https://chinese.yabla.com/chinese-pinyin-chart.php">Yabla Audio Chart</a> [Pinyin][Reference] Southern accent, tones are enunciated so better for learners.`},
])

module.exports = sections;