const generateWordCombos = (words: { word: string, originalWord: string, languageCode: string }[]): { words: string[], originalWords: string[], languageCodes: string[] }[] => {
  const comboWords: { words: string[], originalWords: string[], languageCodes: string[] }[] = [];

  words.forEach((word, j) => {
    words.forEach((comboWord, i) => {
      if (j === i) {
        return;
      }
      comboWords.push({
        words: [ word.word, comboWord.word ],
        originalWords: [ word.originalWord, comboWord.originalWord ],
        languageCodes: [ word.languageCode, comboWord.languageCode ]
      });
    });
  });

  return comboWords;
}

export { generateWordCombos };
