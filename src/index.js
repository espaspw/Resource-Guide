const {isNotInCommon} = require('./utils');

// Adds 'Other' if anything other than Cantonese, Mandarin, or English pops up
function setTags(...tags) {
  // const realTags 
  return (tags.some(isNotInCommon) > 0)
    ? tags.concat(['All', 'Other'])
    : tags.concat(['All']);
}
const convert = {
  "Classical": "Classical Chinese",
  "Old": "Old Chinese",
};

const sections = new Map();

sections.set('Phonetic Input Methods', [
  { tags:  setTags('Mandarin'),
  body: `System Default [ZH][简][繁]` },
  { tags: setTags('Mandarin'),
  body: `<a href="https://www.howtogeek.com/howto/12578/add-keyboard-languages-to-xp-vista-and-windows-7/">Windows</a> - For windows, you want to find “Chinese Simplified (PRC) → Microsoft Pinyin New Experience Input St.” You can switch between Traditional and Simplified, and even assign that to a shortcut key.` },
  { tags: setTags('Mandarin'),
  body: `<a href="http://www.languagegeek.com/keyboard_general/mac_installation1.html">Mac</a>` },
  { tags: setTags('Mandarin'),
  body: `<a href="http://www.pinyinjoe.com/linux/ubuntu-10-chinese-input-pinyin-chewing.htm">Linux</a>` },
  { tags: setTags('Mandarin'),
  body: `<a href="http://rime.im/">Rime</a> [CA][ZH][简][繁][Win][Mac][Linux] - Framework for custom IMEs. Cantonese has Jyutping and Yale.` },
  { tags: setTags('Mandarin'),
  body: `<a href="http://www.cpime.hk/p/cantonese-pinyin-input-software.html?lang=en">CPIME</a> [CA] - Jyutping and Yale phonetic input for Cantonese.` },
  { tags: setTags('Mandarin'),
  body: `<a href="http://taigi.fhl.net/TaigiIME/">FHL Taigi-Hakka IME</a>` },
]);

sections.set('Shape-Based Input Methods', [
  { tags:  setTags('Mandarin'),
  body: `System installed** [倉頡][速成][郑码] - 郑码 no longer supported after Windows 8.` },
  { tags:  setTags('Mandarin'),
  body: `<a href="http://rime.im/">Rime</a> [倉頡][五笔][郑码]` },
  { tags:  setTags('Mandarin'),
  body: `<a href="https://pinyin.sogou.com/">Sogou</a>` },
  { tags:  setTags('Mandarin'),
  body: `<a href="http://www.freewb.org/">FreeWB</a>` },
]);

sections.set('Guides', [
  { tags: setTags('Mandarin'),
  body: `<a href="https://github.com/Super-Panama-World/Resource-Guide/blob/master/Guide%20to%20Learning%20Chinese.md">Guide to Learning Chinese</a>`},

  { tags: setTags('Mandarin'),
  body: `<a href="http://www.hackingchinese.com/a-guide-to-pinyin-traps-and-pitfalls/">Hacking Chinese’s Guide to Pinyin</a>`},

  { tags: setTags('Mandarin'),
  body: `<a href="https://chinese.yabla.com/chinese-pinyin-chart.php">Yabla Audio Chart</a> [Pinyin][Reference] Southern accent, tones are enunciated so better for learners.`},

  { tags: setTags('Mandarin'),
  body: `<a href="http://www.yoyochinese.com/chinese-learning-tools/Mandarin-Chinese-pronunciation-lesson/pinyin-chart-table">Pinyin Audio Chart</a> [Pinyin][Reference] Northern (more standard) accent. Third tone is said quickly as one would naturally say it, so not as ideal for learners.` },

  { tags: setTags('Mandarin'),
  body: `<a href="http://challenges.hackingchinese.com/resources">Hacking Chinese’s articles</a> on <a href="http://www.hackingchinese.com/focusing-on-tone-pairs-to-improve-your-mandarin-pronunciation/">tone practice</a> and <a href="http://www.hackingchinese.com/how-to-learn-chinese-characters-as-a-beginner/">beginning Hanzi</a>. <a href="http://www.hackingchinese.com/media/100-radicals-markus.pdf">100 most common radicals</a>. [Essays]` },
]);

sections.set('Online Grammar/Lessons', [
  { tags: setTags('Mandarin'),
  body: `<a href="https://resources.allsetlearning.com/chinese/grammar/Grammar_points_by_level">Chinese Grammar Wiki</a> [Grammar] A bit terse.` },

  { tags: setTags('Mandarin'),
  body: `<a href="https://chinesepod.com/">Chinese Pod</a> [Lessons][Podcast] Requires free signup.` },

  { tags: setTags('Mandarin'),
  body: `<a href="http://kidschinesepodcast.com/lessons/">Kid’s Chinese Podcast</a> [Lessons][Podcast]` },

  { tags: setTags('Mandarin'),
  body: `<a href="https://www.chineseboost.com/grammar/">Chinese Boost</a> [Grammar]` },

  { tags: setTags('Mandarin'),
  body: `<a href="http://www.hellochinese.cc/">Hello Chinese</a> [Lessons][Vocab] - Gamification A Duolingo-like course` },

  { tags: setTags('Mandarin'),
  body: `<a href="https://www.clozemaster.com/languages/">Clozemaster</a> [Lessons] - Gamification` },

  { tags: setTags('Mandarin'),
  body: `<a href="https://ankiweb.net/shared/info/867291675">Spoonfed Anki Deck</a> [Vocab][Anki]` },
]);

sections.set('Textbooks', [
  { tags: setTags('Mandarin'),
  body: `Mandarin Chinese Grammar [Grammar] by Claudia Ross` },

  { tags: setTags('Mandarin'),
  body: `<a href="https://www.amazon.com/New-Practical-Chinese-Reader-Textbook/dp/7561910401">New Practical Chinese Reader</a> - Progressively teaches reading, writing and listening.` },

  { tags: setTags('Mandarin'),
  body: `<a href="https://www.amazon.com/Chinese-Comprehensive-Grammar-Routledge-Grammars/dp/0415150329">Chinese Comprehensive Grammar</a> [Grammar] Extremely heavy, better for intermediate and advanced learners to for comprehensive approach.` },

  { tags: setTags('Mandarin'),
  body: `<a href="https://en.wikipedia.org/wiki/Remembering_the_Kanji_and_Remembering_the_Hanzi">Heisig’s Remembering the Hanzi Series</a> [Mnemonics][Characters] Controversial. <a href="http://www.saporedicina.com/english/chinese-characters-remember-the-hanzi/">Your mileage may vary</a>.` },
]);

sections.set('HSK', [
  { tags: setTags('Mandarin'),
  body: `<a href="http://www.hsk.academy/">HSK Academy</a> - Very helpful for those learning Chinese characters. Aimed mainly for those seeking the HSK (similar to TOEFL) tests, but still good to learn new words, phrases. There is a short introduction to Chinese grammar also.` },

  { tags: setTags('Mandarin'),
  body: `<a href="http://www.wumaocorp.com/hskcheck/">HSK Check</a>` },

  { tags: setTags('Mandarin'),
  body: `<a href="http://www.chinesetest.cn/godownload.do">Sample Test Papers</a>` },

  { tags: setTags('Mandarin'),
  body: `<a href="http://www.chinaeducenter.com/en/hsk/hsktestscore.php">Conversion</a> - Old HSK to New HSK` },
]);

// <p>There are three ways that Cantonese is romanized. You’ll likely have to get use to all three. Older resources use Yale, newer use Jyutping, natives often use the third. Also take a look at Mandarin section for some start character tips should it be relevant (since dialect learning focuses on speaking).</p>

sections.set('General', [
  { tags: setTags('Cantonese'),
  body: `<a href="https://docs.google.com/document/d/1YCpiRPZbPei0PfaoZUTuesxoJ0TbTWryHM9GbtSM2ig/edit">Quick Starter Guide to Cantonese</a>` },

  { tags: setTags('Cantonese'),
  body: `<a href="https://cantolounge.com/jyutping-chart/">Canto Lounge’s Audio Chart</a> [Jyutping][Sounds][Tones]` },

  { tags: setTags('Cantonese'),
  body: `<a href="https://www.cantoneseclass101.com/cantonese-alphabet/">Cantonese Class 101’s Audio Chart</a> [Jyutping][Sounds]` },

  { tags: setTags('Cantonese'),
  body: `<a href="https://drive.google.com/drive/folders/0BzQw-iJMJ8ygc1AzWWVZWmFPRVk?usp=sharing">Sietse’s Learning Pack</a>` },

  { tags: setTags('Cantonese'),
  body: `<a href="http://cantonese.ca/">Learn Cantonese!</a> Non-standard romanization` },

  { tags: setTags('Cantonese'),
  body: `<a href="https://www.ocf.berkeley.edu/~canto/Public%20Access/Beginning/Beginning%20reader%20for%20Students%20L1%20to%20L6.pdf">Berkley Beginning Cantonese</a> [Yale]` },

  { tags: setTags('Cantonese'),
  body: `<a href="http://www.chinese-lessons.com/cantonese/">http://www.chinese-lessons.com/cantonese/</a>` },

  { tags: setTags('Cantonese'),
  body: `<a href="http://podcast.rthk.org.hk/podcast/item_all.php?pid=45&amp;current_year=2007">Podcast: Naked Cantonese</a>` },

  { tags: setTags('Cantonese'),
  body: `<a href="https://culturequote.files.wordpress.com/2013/03/cantonese-basic.pdf">Culture Quote</a> [Yale]` },

  { tags: setTags('Cantonese'),
  body: `<a href="http://www.cantonese.sheik.co.uk/essays/">Adam Sheik’s Articles</a> [Essays]` },
]);

sections.set('Word Lists', [
  { tags: setTags('Cantonese'),
  body: `<a href="https://docs.google.com/spreadsheets/d/1ArxEFo46PTrDyDDhWyu3wB0epxqTyd8WBaprnwTEPm4/edit#gid=1428902047">Frequency List</a>` },

  { tags: setTags('Cantonese'),
  body: `<a href="https://docs.google.com/spreadsheets/d/1Aglvq1BeuKweRnKrY3wRMIuKu4FRDAhwdM98cqjqJSQ/htmlview">Slang Google Doc</a> - A bit outdated` },

  { tags: setTags('Cantonese'),
  body: `Slang - http://evchk.wikia.com/wiki/%E9%A6%96%E9%A0%81` },

  { tags: setTags('Cantonese'),
  body: `Slang - http://hkdic.my-helper.com/` },
]);

sections.set('Other Learning', [
  { tags: setTags('Cantonese'),
  body: `<a href="http://www.clc.scicube.info/book_link/book_link.html">Cantonese Learning Centre E-book List</a>` },

  { tags: setTags('Cantonese'),
  body: `<a href="http://www.chinese-lessons.com/cantonese/">Cantonese Lessons</a>` },

  { tags: setTags('Cantonese'),
  body: `<a href="https://www.youtube.com/channel/UCqDaS_9aDl_N7ipFlSQ6LTw/playlists?shelf_id=0&amp;view=1&amp;sort=dd">High School Class Youtube Recordings</a>` },

  { tags: setTags('Cantonese'),
  body: `<a href="http://www.freehongkong.net/learn-cantonese-grammar-conjunction-and-sentence-connector/">Free Hong Kong Cantonese Grammar</a> - Romanization system is non-standard` },
]);

sections.set('Tools', [
  { tags: setTags('Mandarin'),
  body: `<a href="http://ankisrs.net/">Anki</a> [Memorization][<a href="http://www.omniglot.com/language/srs.php">SRS</a>] - Flashcard memorization program. Recommend using anki as a revision tool and <a href="https://eastasiastudent.net/study/anki-structure/">build your own decks</a>, but if you really want to can find <a href="https://ankiweb.net/shared/decks/">pre-built decks</a> to learn vocabulary. Also see <a href="http://www.isimplylovelanguages.com/serial-how-to-use-anki-effectively/">this</a>.` },

  { tags: setTags('Mandarin'),
  body: `<a href="http://www.zhtoolkit.com/apps/chinese_word_extractor/">Zhtoolkit</a> [Text Analysis] - Breakdowns a text into its constituent words with definitions with CC-EDICT. Can custom set dictionary and also filter out learnt words.` },

  { tags: setTags('Mandarin'),
  body: `[Pomodoro] Technique](http://pomodorotechnique.com/get-started/#how) - Help stay focused` },

  { tags: setTags('Mandarin'),
  body: `<a href="https://sourceforge.net/projects/jnovelformatter/">JNovelFormter</a> - Quickly converts .txt files to be easily viewed as an HTML document. Useful in conjunction with popup dictionaries and the popup-dictionary-to-Anki function` },
]);

sections.set('Browser Plugins', [
  { tags: setTags('Mandarin'),
  body: `Browser Popup Dictionaries - Several listed in next section` },

  { tags: setTags('Mandarin'),
  body: `Simplified↔Traditional Conversion [<a href="https://chrome.google.com/webstore/detail/njstar-chinese-website-co/oljejbejachaajllbbjiamdkhipbbppk?hl=en">Chrome</a>][<a href="https://addons.mozilla.org/en-us/firefox/addon/meihua-chinese-converter/">Firefox</a>] - Firefox not yet compatible ` },

  { tags: setTags('Mandarin'),
  body: `<a href="https://ankiweb.net/shared/info/2512410601">Real Time Anki Import</a> - To automate anki entry` },
]);

sections.set('Websites', [
  { tags: setTags('Mandarin'),
  body: `<a href="https://www.rabb.it/">Rabbit</a> - Screen sharing. Optional account login and friending. Works for Karaoke too!` },

  { tags: setTags('Mandarin'),
  body: `Wikipedia - Great for translating technical jargon or just generally specific words. Find the article, then click on the chinese version of that article.` },

  { tags: setTags('Mandarin'),
  body: `<a href="http://fanyi.baidu.com/#zh/yue/">Baidu translate</a> [MTL] Machine translator. Has Mandarin, Cantonese, and Classical.` },

  { tags: setTags('Mandarin'),
  body: `<a href="http://traslate.google.com/">Google Translate</a> [MTL] Great for handwriting recognition. Click on the 拼 -> handwriting` },
]);

sections.set('Other', [
  { tags: setTags('Mandarin'),
  body: `<a href="https://www.chineseconverter.com/cantonesetools/en/cantonese-to-jyutping">Jyutping Converter</a>` },

  { tags: setTags('Mandarin'),
  body: `<a href="http://horizontalhanzi.com/">Horizontal Hanzi</a> - For disambiguating similar-looking characters` },

  { tags: setTags('Mandarin'),
  body: `<a href="https://www.memrise.com/">Memrise</a> [SRS] - Teaches through exercise. Pay option.` },

  { tags: setTags('Mandarin'),
  body: `<a href="http://skritter.com/">Skritter</a> A pay-for service that combines responsive feedback with SRS learning. Writing and vocabulary. Review of skritter.` },

  { tags: setTags('Mandarin'),
  body: `<a href="http://www.fastchinese.org/flashcards">Chinese Tutor Flashcards</a> - A site that works like flashcards to help memorize the Pinyin for Chinese words/phrases.` },

  { tags: setTags('Mandarin'),
  body: `<a href="http://pin1yin1.com/">Pin1yin1</a> - Converts characters to pinyin with diacritics (tone markers) or zhuyin to a text` },

  { tags: setTags('Mandarin'),
  body: `<a href="https://www.chinesetextanalyser.com/">Text analyser</a> - Pay for program` },
]);

//<h2 id="dictionaries">Dictionaries</h2>
//<p>Because of disconnect between phonetic reading and graphic representation of hanzi, knowing how to seperate character into its radical and phonetic component in addition to learning characters by their strokes. Not only number of strokes but order of strokes is especially useful for getting handwriting recognition to work for you.</p>
//<p>More important introduction coming soon. Such dictionaries are organized by pinyin, but also come with a character index at the start that is organized by number of strokes in the radical, then by number of strokes excluding the radical.</p>

sections.set('Recommended Dictionaries', [
  { tags: setTags('Mandarin', 'Simplified'),
  body: `<a href="http://www.linedict.com/">Line</a> (formerly Nciku) [EN→ZH][EN←ZH][EN↔Thai][Online] Most examples, flexible handwriting detection, and has the features. A tad bulky/slow. ` },

  { tags: setTags('Mandarin'),
  body: `<a href="http://www.zdic.net/">Zdic</a> [C↔C,EN][Online] Etymology, stroke-based IME lookup, dialect readings (音韵方言), etc.` },

  { tags: setTags('Mandarin'),
  body: `<a href="http://www.mdbg.net/chindict/chindict.php">MDCG</a> [EN↔ZH][Online] A fairly lightweight and responsive C-E and E-C Mandarin dictionary based on CC-CEDict.A2 Can search sentence for easy of searching multiple vocabulary but do not rely on it to parse.` },

  { tags: setTags('Mandarin'),
  body: `Zhong Wen (<a href="https://addons.mozilla.org/en-us/firefox/addon/zhong-wen/">Firefox</a>) (<a href="https://chrome.google.com/webstore/detail/zhongwen-chinese-english/kkmlkkjojmombglmlpbpapmhcaljjkde/support?hl=en">Chrome</a>). Mandarin popup dictionaries available for both browsers. Still recommend Cantofish/PCD though they are Cantonese-based. Firefox versions not compatible with newest version yet.` },

  // Cantonese
  { tags: setTags('Cantonese'),
  body: `<a href="http://www.cantonese.sheik.co.uk/dictionary/">CantoDict</a> [EN↔CA][Online] Jyutping, audio bytes, examples. You have to make sure you select the right category for searching.` },
  { tags: setTags('Cantonese', 'Mandarin'),
  body: `<a href="https://addons.mozilla.org/en-US/firefox/addon/cantofish/">Cantofish</a> (FF) or <a href="https://chrome.google.com/webstore/detail/cantonese-popup-dictionar/pjnbhojkojmibobcpfgihhnohboldhip">CPD (Chrome)</a> [EN↔CA,ZH][Browser] Popup dictionary much like Rikai. Firefox version supports Jyutping, Yale, Pinyin. Supports Anki import.` },
  { tags: setTags('Cantonese'),
  body: `<a href="http://cantonese.org/">Pleco</a> [EN↔ZH,CA][Android][iOS] CC-C-E dictionary based on CC-EDictA2 with a human check for differences for Cantonese. The app version for Android and iPhone are mandarin only. You have to enable Cantonese in settings for the mobile app.` },
  { tags: setTags('Cantonese'),
  body: `<a href="http://words.hk/">Jyutdin</a> [CA↔CA][Online]` },
]);

//<p>Recommend getting a Cantofish over (even for Mandarin), especially if you plan on doing any sort of learning through reading.</p>

sections.set('Other Dictionaries', [
  { tags: setTags('Mandarin'),
  body: `<a href="https://baike.baidu.com/">Baidu Baike</a> [ZH→ZH,EN] An encyclopedia, but it does list definitions.` },

  { tags: setTags('Mandarin'),
  body: `<a href="http://dictionary.pinpinchinese.com/">Pin Pin</a> [EN↔ZH] Fast, clean, and responsive.` },

  { tags: setTags('Mandarin'),
  body: `<a href="http://humanum.arts.cuhk.edu.hk/Lexis/lexi-mf/">Multi-function Chinese Character Database CC-English-C</a> (Uses homophones in addition to romanisation for pronunciation, for those that are more comfortable with that than romanisation) (Also has audio clips, but those can be a little stretched out to emphasise the tones)` },

  { tags: setTags('Mandarin'),
  body: `现代汉语词典5th Ed. [ZH↔ZH][Book] Standard dictionary that Mainland uses. ` },

  { tags: setTags('Mandarin'),
  body: `<a href="https://www.wenlin.com/download">Wenlin</a> [EN↔ZH] free/paid version, quite a good offline dictionary. Handwriting recognition, marks tone changes, really great for tracing the origin of characters.` },

  { tags: setTags('Cantonese'),
  body: `<a href="https://play.google.com/store/apps/details?id=com.embermitre.hanping.cantodict.app.pro">Hanping Dictionary</a> [EN↔CA] Offline dictionary that you install to your browser. ` },

  { tags: setTags('Mandarin'),
  body: `<a href="http://www.zhongwen.com/">Zhongwen</a> [EN↔ZH][Online] (Unrelated to popup dictionary). Lightweight and responsive. Alternative to Wenlin for radical-based breakdown of characters and shared-radical map. However, character search does not work (might be encoding issue) and unable to copy paste.` },

  { tags: setTags('Mandarin'),
  body: `<a href="http://www.perapera.org/">Perapera</a> [EN↔ZH] Another Mandarin popup dictionary.` },

  { tags: setTags('Mandarin'),
  body: `<a href="http://ichacha.net/">Ichacha</a>` },

  { tags: setTags('Mandarin'),
  body: `<a href="http://hanzicraft.com/">HanziCraft</a>, Breaks down character into radicals and assorted strokes. Also features a table list of homonyms.` },

  { tags: setTags('Mandarin'),
  body: `http://dict.revised.moe.edu.tw/cbdic/search.htm` },

  { tags: setTags('Mandarin'),
  body: `http://dictall.com/indu/035/0340368F65C.htm - For technical translation, though wikipedia works too.` },
]);

sections.set('Reading Material', [
  { tags: setTags('Mandarin'),
  body: `<a href="http://storyfree.com/">Children Stories</a>` },

  { tags: setTags('Mandarin'),
  body: `<a href="https://www.reddit.com/r/chinesebookclub/">Chinese Book Club on Reddit</a>` },

  { tags: setTags('Mandarin'),
  body: `<a href="http://www.tsoidug.org/">Tsoi Dug’s bilingual site</a> - Essays, poetry, articles on culture, etc. in both English and Chinese. ` },

  { tags: setTags('Mandarin'),
  body: `<a href="http://cendalirit.blogspot.hk/">每天為你讀一首詩</a> - A blog featuring daily posts on modern Chinese poetry` },

  { tags: setTags('Mandarin'),
  body: `<a href="http://www.chinese-stories.com/">Chinese Stories</a> - Graded Reading. ` },

  { tags: setTags('Mandarin'),
  body: `<a href="http://web.archive.org/web/20130709010055/http://www.chinesestoriesplatform.com/">Chinese Stories Platform</a> - Graded reading` },

  { tags: setTags('Mandarin'),
  body: `<a href="http://justlearnchinese.com/mini-novels/">Just Learn Chinese</a> - Graded reading` },

  { tags: setTags('Mandarin'),
  body: `<a href="https://www.duchinese.net/">Du Chinese</a> - Phone app. Graded reading with mouse over translations and transliterations` },

  { tags: setTags('Mandarin'),
  body: `<a href="http://www.decipherchinese.com/">Decipher</a> - Phone app with paid service. Daily graded articles.` },
]);

sections.set('Unevaluated', [
  { tags: setTags('Mandarin'),
  body: `http://www-personal.umich.edu/~dporter/sampler/sampler.html <code>Figure out if this has classical Chinese or not</code>` },
]);

sections.set('Newspaper', [
  { tags: setTags('Mandarin'),
  body: `9Newspaper tailored to learners](http://www.thechairmansbao.com/)` },

  { tags: setTags('Mandarin'),
  body: `<a href="http://mandarinweekly.com/">Mandarin Weekly</a> - A weekly newsletter containing Mandarin study stuff!` },

  { tags: setTags('Mandarin'),
  body: `<a href="http://cn.nytimes.com/">New York Times in Chinese</a>` },

  { tags: setTags('Mandarin'),
  body: `<a href="http://www.mingpao.com/">Ming Pao Newspaper</a> (Trad. Chinese) ` },

  { tags: setTags('Mandarin'),
  body: `<a href="http://news.singtao.ca/toronto/">Sing Tao Newspaper</a> (Trad. Chinese) ` },
]);

sections.set('Novels and Visual Novels', [
  { tags: setTags('Mandarin'),
  body: `<a href="http://www.qidian.com/">Qidian</a>` },
  { tags: setTags('Mandarin'),
  body: `<a href="http://www.xxsy.net/">xxsy</a>` },
  { tags: setTags('Mandarin'),
  body: `<a href="http://xs.cn/">xs</a>` },
  { tags: setTags('Mandarin'),
  body: `<a href="http://www.jjwxc.net/">jjwxc</a>` },
  { tags: setTags('Mandarin'),
  body: `Cantonese webnovels` },
  { tags: setTags('Mandarin'),
  body: `<a href="https://vndb.org/v/all?q=&amp;fil=olang-zh&amp;rfil=">Chinese Visual Novels originals</a> - In case you don’t know these are basically books with pretty pictures and music in -the background. You can find some of these on Steam. For all translated to Chinese, <a href="https://vndb.org/v/all?q=&amp;fil=lang-zh&amp;rfil=">here</a>.` },
  { tags: setTags('Cantonese', 'Mandarin'),
  body: `<a href="http://forum8.hkgolden.com/topics.aspx?type=SY">HKGolden</a>` },
  { tags: setTags('Mandarin'),
  body: `<a href="http://shikoto.com/">Shikoto</a>` },
  { tags: setTags('Mandarin'),
  body: `<a href="http://haodoo.net/">Fan-transcribed E-books</a>` },
  { tags: setTags('Mandarin'),
  body: `<a href="http://www.novelupdates.com/series-finder/?sf=1&amp;org=495&amp;sort=abc&amp;order=asc">Novelupdates</a> - In case you want the ~~totally legal~~ fan translations to reference. Fantasy genres <a href="https://www.reddit.com/r/LightNovels/comments/36q51h/as_a_chinese_id_like_to_talk_about_those_chinese/">explanations</a> Xianxia has become kinda catch all in English.` },
]);

sections.set('Dramas', [
  { tags: setTags('Mandarin'),
  body: `<a href="https://www.rabb.it/">Rabbit</a> - Screensharing site. Check out description in tools` },

  { tags: setTags('Mandarin'),
  body: `<a href="http://mydramalist.com/">MyDramalist</a> - Drama information and watchlist site ` },

  { tags: setTags('Mandarin'),
  body: `<a href="https://www.youtube.com/channel/UCPIRD4yr1hlAEovBCSNlAKg">Croton's</a> Official Youtube [ZH]` },

  { tags: setTags('Cantonese'),
  body: `<a href="http://dramatvb.com/">TVB</a> (moved to <a href="http://dramatvb.se/">here</a>?)` },

  { tags: setTags('Mandarin'),
  body: `<a href="http://www.dnvod.tv/">Dnvod</a> - Loads of movies with Chinese subs/dubs.` },

  { tags: setTags('Mandarin'),
  body: `<a href="http://www.viki.com/">Viki</a>` },
]);

sections.set('Youtube Lessons', [
  { tags: setTags('Mandarin'),
  body: `<a href="https://mandarinmadeez.com/">Mandarin Madeez</a> - YouTube videos by Fiona Tian, these are awesome!` },

  { tags: setTags('Mandarin'),
  body: `<a href="https://www.youtube.com/channel/UCpuAQiIlxFe0FlR2gXXLUKA/videos?flow=list&amp;view=0&amp;sort=da">Xue Bai’s Youtube Series</a>` },

  { tags: setTags('Mandarin'),
  body: `<a href="https://www.youtube.com/channel/UCsl59JxjRtBSc3zdt6-Xymw">Mandarin is Awesome</a> - Youtube Mandarin course` },

  { tags: setTags('Mandarin'),
  body: `<a href="https://www.youtube.com/channel/UCpN2N1K4pWzlW5qDd0HjhDQ">Shawn's Mando Chinese</a> - Youtube Mandarin course` },

  { tags: setTags('Mandarin'),
  body: `<a href="https://www.youtube.com/playlist?list=PLRLvrbf9kpcOKZxFUpPXHgoAKIr_wHXvP&amp;">Growing Up With Chinese</a> - Youtube Mandarin course` },
]);

sections.set('Other Media', [
  { tags: setTags('Mandarin'),
  body: `http://live.sk-knower.com/hk - filters twitch Hong Kong streamers` },
]);

sections.set('Manhua', [
  { tags: setTags('Mandarin'),
  body: `<a href="http://www.kuaikuaimanhua.com/">Kuai Kuai Manhua</a> - Mandarin` },

  { tags: setTags('Mandarin'),
  body: `<a href="http://www.lianzai.me/">Lianzai</a> - Mandarin` },

  { tags: setTags('Mandarin'),
  body: `<a href="http://www.u17.com/">U17</a> - Mandarin` },

  { tags: setTags('Mandarin'),
  body: `<a href="http://ac.qq.com/">QQ</a> - Mandarin` },
]);

sections.set('Donghua', [
  { tags: setTags('Mandarin'),
  body: `<a href="https://v.qq.com/">QQ Donghua</a>` },

  { tags: setTags('Mandarin'),
  body: `<a href="http://bangumi.bilibili.com/">Bilibili</a>` },

  { tags: setTags('Mandarin'),
  body: `<a href="https://www.youtube.com/channel/UC-Z7nO8GGZt_FZeG8UMC4Sw">Dai Yi Fansubs</a> - Donghua with english subs` },
]);

sections.set('Audio', [
  { tags: setTags('Mandarin'),
  body: `<a href="http://singchinesesongs.com/">Sing Chinese Songs</a> - Learn Chinese through song. You sing karaoke with pinyin/characters and then turn off the pinyin.` },

  { tags: setTags('Mandarin'),
  body: `<a href="https://www.youtube.com/channel/UCafN-F8I7z-8lTcXAhGgTWg">Cantonese Audio Dramas: Ka Yi’s Youtube Series</a>` },

  { tags: setTags('Mandarin'),
  body: `<a href="http://www.1ting.com/rank/pop.html">Chinese Songs Classics: Yi Ting</a>` },
]);

sections.set('Radio', [
  { tags: setTags('Mandarin'),
  body: `http://radio.bbtv.cn/` },
]);

sections.set('Podcasts', [
  { tags: setTags('Mandarin'),
  body: `<a href="http://chinesepod.com/">Chinese Pod</a>` },

  { tags: setTags('Mandarin'),
  body: `Mandarin Audio Books: <a href="http://podcast.rthk.hk/podcast/item_epi.php?pid=448">RTHK’s podcast</a> and <a href="http://tingbook.com/">Tingbook</a>` },

  { tags: setTags('Mandarin'),
  body: `Cantonese Audio Books: <a href="http://podcast.rthk.hk/podcast/item_epi.php?pid=447">RTHK’s podcasts</a> (Mandarin-original) ` },

  { tags: setTags('Mandarin'),
  body: `<a href="http://popupcantonese.com/">Popup cantonese</a>` },
]);

sections.set('Other Chinese Languages', [
  { tags: setTags('Hokkien'),
  body: `http://english.moe.gov.tw/lp.asp?ctNode=11446&amp;CtUnit=1351&amp;BaseDSD=16` },

  { tags: setTags('Hokkien'),
  body: `http://english.moe.gov.tw/ct.asp?xItem=14768&amp;ctNode=11446&amp;mp=1` },

  { tags: setTags('Hakka'),
  body: `http://wiki.hakka.gov.tw/ hakka dictionary` },

  { tags: setTags('Hakka'),
  body: `http://web3.hakka.gov.tw/lp.asp?ctNode=2355&amp;CtUnit=760&amp;BaseDSD=7&amp;mp=11&amp;ps=` },

  { tags: setTags('Mandarin', 'Cantonese', 'Hokkien', 'Wu'),
  body: `<a href=http://kaifangcidian.com/>Kaifang Cidian</a> - Mandarin, Cantonese, Hokkien, and Wu Dictionary` },

  { tags: setTags('Hokkien'),
  body: `<a href="http://twblg.dict.edu.tw/holodict_new/default.jsp">Hokkien/臺語/闽南话 dictionary</a> ` },

  { tags: setTags('Taishanese'),
  body: `<a href="http://www.stephen-li.com/TaishaneseVocabulary/Taishanese.html">Stephen Li Taishanese Dictionary</a>` },

  { tags: setTags('Shanghainese'),
  body: `http://www.sinosplice.com/learn-chinese/shanghainese-soundboard` },
]);

sections.set('Miscellaneous', [
  { tags: setTags('Mandarin'),
  body: `http://csulb.learningchineseonline.net/ a whole lot of resources` },

  { tags: setTags('Mandarin'),
  body: `<a href="http://www.chinasimplified.com/">China Simplified</a> - Useful articles about studying Mandarin and the language itself.` },

  { tags: setTags('Mandarin'),
  body: `<a href="https://glossika.com/courses/">Glossicka’s Courses</a> - A pay-for course. Has Cantonese, Hakka, Mandarin (Mainland/Taiwan), and Taiwanese Hokkien flavours.` },

  { tags: setTags('Mandarin'),
  body: `<a href="http://fluentu.com/">FluentU</a> - A site that provides short Chinese videos with subtitles with characters, pinyin and English.` },

  { tags: setTags('Mandarin'),
  body: `<a href="http://www.zein.se/patrick/3000char.html">Three Thousand Hanzi</a> by frequency by Patrick Hassel Zein ` },

  { tags: setTags('Mandarin'),
  body: `<a href="https://discord.gg/BWaZeP8">Ling and Lang discord</a> - A discord server focused around learning multiple languages` },

  { tags: setTags('Mandarin'),
  body: `<a href="http://www.lang-8.com/">Lang-8</a> - an exchange based around writing in a foreign language providing corrections. Good for getting grammar corrected. They recommend writing no more than a couple of paragraphs and recommend writing a translation of what you wanted to say.` },

  { tags: setTags('Mandarin'),
  body: `<a href="http://hellotalk.com/">HelloTalk</a>, <a href="https://hinative.com/">HiNative</a>, <a href="http://www.wechat.com/en/">WeChat</a> . For meeting and talking with Natives. Be sure to google how to make the most of a language exchange. ` },

  { tags: setTags('Mandarin'),
  body: `<a href="http://confusedlaowai.com/2013/07/comprehensive-onomatopoeia-list/">Onomatopoeia list</a> - Sound words in Mandarin` },

  { tags: setTags('Mandarin'),
  body: `http://www.hackingchinese.com/chinese-character-variants-and-fonts-for-language-learners/` },
]);

sections.set('Blogs', [
  { tags: setTags('Mandarin'),
  body: `http://speakupchinese.tumblr.com/ - A tumblr blog with some useful phrases and articles.` },

  { tags: setTags('Mandarin'),
  body: `https://themandarincornerblog.com` },
]);

sections.set('Etymology and Calligraphy', [
  { tags: setTags('Mandarin'),
  body: `<a href="http://www.chineseetymology.org/why_study.aspx">Character Etymology</a> - Also links two useful apps for searching characters` },

  { tags: setTags('Mandarin'),
  body: `<a href="https://itunes.apple.com/us/app/%E5%8F%A4%E6%96%87%E5%AD%97%E7%8C%9C%E7%8C%9C%E6%A8%82/id1193864419?mt=8">App for Learning Oracle Bone Script</a> [iOS]` },

  { tags: setTags('Mandarin'),
  body: `<a href="https://www.quora.com/How-are-Chinese-dictionaries-organized">A Quorra article on dictionary character sorting</a>` },

  { tags: setTags('Mandarin'),
  body: `<a href="http://www.shufazidian.com/">Calligraphy Dictionary</a>` },

  { tags: setTags('Mandarin'),
  body: `<a href="https://www.youtube.com/channel/UCvPiCUjsIEaCdYiHtP4pbPg">Youtube channel on handwriting</a> - Goes over several examples and general advice for handwriting in Mandarin. A <a href="https://www.youtube.com/watch?v=7s6pxhNql70">fifteen-part series</a> on handwriting characters but in Japanese.` },
]);

sections.set('Nerdy Rubbish', [
  { tags: setTags('Mandarin'),
  body: `<a href="http://hayataki-masaharu.jp/web-typography-in-japanese/">Typesetting characters</a> in Japanese but also applicable to Chinese` },

  { tags: setTags('Mandarin'),
  body: `<a href="http://unicode.org/faq/han_cjk.html">Unicode FAQ on CJK Characters</a> - On the technicalities of representing fonts` },

  { tags: setTags('Mandarin'),
  body: `<a href="https://www.youtube.com/watch?v=k8Hxq1YIsjE">Mandarin IPA I</a> and <a href="https://www.youtube.com/watch?v=JDcRuwV2hrg">Mandarin IPA II</a>` },

  { tags: setTags('Mandarin'),
  body: `<a href="http://www.ibiblio.org/chinesehistory/contents/08fea/c02.html#Fonts">Fonts for Older Scripts</a>` },
]);

sections.set('Classical Chinese', [
  { tags: setTags('Classical'),
  body: `<a href="http://ctext.org/dictionary.pl?if=en">Ctext Dictionary</a>` },
]);

sections.set('Dictionaries', [
  { tags: setTags('Classical'),
  body: `<a href="http://chinesenotes.com/classical_chinese.html">Notes on Literary Chinese</a> by Alex Ames` },

  { tags: setTags('Classical'),
  body: `[<a href="https://drive.google.com/file/d/0B91IVDKbLk-YdGNHRjlObEVyUU0/view">PDF</a>] A New Practical Primer of Literary Chinese by Paul Rouzer` },

  { tags: setTags('Classical'),
  body: `<a href="http://www.jonvonkowallis.com/readers/Wenyan-Wen/index.php">Wenyan Wen: Introduction to Classical Chinese Language</a> by Jon von Kowalis` },

  { tags: setTags('Classical'),
  body: `<a href="http://www.invisiblebooks.com/CGCC.htm">A Concise Grammar of Classical Chinese</a> by Yakov Rabinovich, 2010.` },
]);

sections.set('Texts', [
  { tags: setTags('Classical'),
  body: `Database of texts: <a href="http://ctext.org/">Ctext</a> and http://tls.uni-hd.de/home_en.lasso` },

  { tags: setTags('Classical'),
  body: `<a href="http://wengu.tartarie.com/wg/wengu.php?l=intro">Wengu</a> - One of the best resources for classical Chinese works.` },

  { tags: setTags('Classical'),
  body: `<a href="https://zh-classical.wikipedia.org/wiki/%E7%B6%AD%E5%9F%BA%E5%A4%A7%E5%85%B8:%E5%8D%B7%E9%A6%96">Wikipedia in classical</a>` },

  { tags: setTags('Classical'),
  body: `<a href="http://chinese-poems.com/">ChinesePoetry</a> - Ancient Chinese Poetry.` },

  { tags: setTags('Classical'),
  body: `<a href="http://open-lit.com/list.php">List of Novels</a>` },
]);

sections.set('Stuff', [
  { tags: setTags('Classical'),
  body: `<a href="https://discord.gg/BdSb4AJ">A discord focused on classical texts (not just Chinese)</a>` },

  { tags: setTags('Classical'),
  body: `<a href="https://www.reddit.com/r/classicalchinese/">r/ClassicalChinese</a> - Subreddit` },

  { tags: setTags('Classical'),
  body: `<a href="http://podcast.rthk.hk/podcast/item_all.php?pid=702&amp;lang=zh-CN">RHTK’s Cantonese Podcast</a> about 古文觀止` },

  { tags: setTags('Classical'),
  body: `<a href="https://www.quora.com/Is-Taishanese-better-for-reading-old-Chinese-poetry-or-Cantonese-Which-one-would-rhyme-more">Is Taishanese better than Cantonese for old Chinese poetry</a>` },

  { tags: setTags('Classical'),
  body: `Kanbun, Hanmun, Chữ Nôm, Cổ văn go!` },
]);

sections.set('Old Chinese', [
  { tags: setTags('Old'),
  body: `<p><a href="https://discordapp.com/invite/te89K64">United Nations of Ancient and Endangered Languages Discord</a>` },

  { tags: setTags('Old'),
  body: `<code>Coming Soon™</code></p>` },
]);

module.exports = sections;
