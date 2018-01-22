const toExport = {
  COMMON_LANGS: [ // Displays first and other languages will get other tagged
    'All', 'Cantonese', 'English', 'Mandarin', 'Other'
  ],
  isNotInCommon: tag => !toExport.COMMON_LANGS.some(lang => lang === tag),
};

module.exports = toExport;