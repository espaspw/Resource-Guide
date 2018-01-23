const toExport = {
  COMMON_LANGS: [ // Displays first and other languages will get other tagged
    'All', 'Cantonese', 'English', 'Mandarin', 'Other'
  ],
  tagToName: {
    Mandarin: 'Mandarin',
    Cantonese: 'Cantonese', 
    Hokkien: 'Hokkien/臺語/闽南话',
    Hakka: 'Hakka/客家話',
    Wu: 'Wu/吴',
    Taishanese: 'Taishanese',

    Simplified: 'Simplified/简体',
    Traditional: 'Traditional/繁體',
    Classical: 'Classical Chinese',
    Historical: 'Old Chinese',
  },
  isNotInCommon: tag => !toExport.COMMON_LANGS.some(lang => lang === tag),
};

module.exports = toExport;