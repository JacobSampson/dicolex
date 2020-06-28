import { WordCombo } from "../models/word-combo";

const generateWordCombos = (words: { word: string, originalWord: string, languageCode: string }[]): WordCombo[] => {
  const comboWords: WordCombo[] = [];

  words.forEach((word, j) => {
    words.forEach((comboWord, i) => {
      comboWords.push({
        words: [ word.word, comboWord.word ],
        originalWords: [ word.originalWord, comboWord.originalWord ],
        languageCodes: [ word.languageCode, comboWord.languageCode ]
      });
    });
  });

  return comboWords.sort((comboWord, otherComboWord) =>
    (comboWord.words[0].length + comboWord.words[1].length) - 
    (otherComboWord.words[0].length + otherComboWord.words[1].length)
  );
}

export { generateWordCombos };
