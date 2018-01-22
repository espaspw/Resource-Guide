const {isNotInCommon} = require('./utils');

// Adds 'Other' if anything other than Cantonese, Mandarin, or English pops up
function setTags(...tags) {
  return (tags.filter(isNotInCommon).length > 0)
    ? tags.concat(['All', 'Other'])
    : tags.concat(['All']);
}

const sections = new Map();

sections.set("Guides", [
  { tags: setTags('Mandarin'),
    body: `<li><a href="https://github.com/Super-Panama-World/Resource-Guide/blob/master/Guide%20to%20Learning%20Chinese.md">Guide to Learning Chinese</a></li>`},

  { tags: setTags('Mandarin'),
  body: `<li><a href="http://www.hackingchinese.com/a-guide-to-pinyin-traps-and-pitfalls/">Hacking Chinese’s Guide to Pinyin</a></li>`},

  { tags: setTags('Mandarin'),
  body: `<li><a href="https://chinese.yabla.com/chinese-pinyin-chart.php">Yabla Audio Chart</a> [Pinyin][Reference] Southern accent, tones are enunciated so better for learners.</li>`},

  { tags: setTags('Mandarin'),
  body: `<li><a href="http://www.yoyochinese.com/chinese-learning-tools/Mandarin-Chinese-pronunciation-lesson/pinyin-chart-table">Pinyin Audio Chart</a> [Pinyin][Reference] Northern (more standard) accent. Third tone is said quickly as one would naturally say it, so not as ideal for learners.</li>` },

  { tags: setTags('Mandarin'),
  body: `<li><a href="http://challenges.hackingchinese.com/resources">Hacking Chinese’s articles</a> on <a href="http://www.hackingchinese.com/focusing-on-tone-pairs-to-improve-your-mandarin-pronunciation/">tone practice</a> and <a href="http://www.hackingchinese.com/how-to-learn-chinese-characters-as-a-beginner/">beginning Hanzi</a>. <a href="http://www.hackingchinese.com/media/100-radicals-markus.pdf">100 most common radicals</a>. [Essays]</li>` },
]);

sections.set("Online Grammar/Lessons", [

  { tags: setTags('Mandarin'),
  body: `<li><a href="https://resources.allsetlearning.com/chinese/grammar/Grammar_points_by_level">Chinese Grammar Wiki</a> [Grammar] A bit terse.</li>` },

  { tags: setTags('Mandarin'),
  body: `<li><a href="https://chinesepod.com/">Chinese Pod</a> [Lessons][Podcast] Requires free signup.</li>` },

  { tags: setTags('Mandarin'),
  body: `<li><a href="http://kidschinesepodcast.com/lessons/">Kid’s Chinese Podcast</a> [Lessons][Podcast]</li>` },

  { tags: setTags('Mandarin'),
  body: `<li><a href="https://www.chineseboost.com/grammar/">Chinese Boost</a> [Grammar]</li>` },

  { tags: setTags('Mandarin'),
  body: `<li><a href="http://www.hellochinese.cc/">Hello Chinese</a> [Lessons][Vocab] - Gamification A Duolingo-like course</li>` },

  { tags: setTags('Mandarin'),
  body: `<li><a href="https://www.clozemaster.com/languages/">Clozemaster</a> [Lessons] - Gamification</li>` },

  { tags: setTags('Mandarin'),
  body: `<li><a href="https://ankiweb.net/shared/info/867291675">Spoonfed Anki Deck</a> [Vocab][Anki]</li>` },
]);

sections.set('Textbooks</h3>', [
  { tags: setTags('Mandarin'),
  body: `<li>Mandarin Chinese Grammar [Grammar] by Claudia Ross</li>` },

  { tags: setTags('Mandarin'),
  body: `<li><a href="https://www.amazon.com/New-Practical-Chinese-Reader-Textbook/dp/7561910401">New Practical Chinese Reader</a> - Progressively teaches reading, writing and listening.</li>` },

  { tags: setTags('Mandarin'),
  body: `<li><a href="https://www.amazon.com/Chinese-Comprehensive-Grammar-Routledge-Grammars/dp/0415150329">Chinese Comprehensive Grammar</a> [Grammar] Extremely heavy, better for intermediate and advanced learners to for comprehensive approach.</li>` },

  { tags: setTags('Mandarin'),
  body: `<li><a href="https://en.wikipedia.org/wiki/Remembering_the_Kanji_and_Remembering_the_Hanzi">Heisig’s Remembering the Hanzi Series</a> [Mnemonics][Characters] Controversial. <a href="http://www.saporedicina.com/english/chinese-characters-remember-the-hanzi/">Your mileage may vary</a>.</li>` },
]);

sections.set("HSK", [
  { tags: setTags('Mandarin'),
  body: `<li><a href="http://www.hsk.academy/">HSK Academy</a> - Very helpful for those learning Chinese characters. Aimed mainly for those seeking the HSK (similar to TOEFL) tests, but still good to learn new words, phrases. There is a short introduction to Chinese grammar also.</li>` },

  { tags: setTags('Mandarin'),
  body: `<li><a href="http://www.wumaocorp.com/hskcheck/">HSK Check</a></li>` },

  { tags: setTags('Mandarin'),
  body: `<li><a href="http://www.chinesetest.cn/godownload.do">Sample Test Papers</a></li>` },

  { tags: setTags('Mandarin'),
  body: `<li><a href="http://www.chinaeducenter.com/en/hsk/hsktestscore.php">Conversion</a> - Old HSK to New HSK</li>` },



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