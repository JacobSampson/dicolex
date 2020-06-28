import { WordCombo } from "../models/word-combo";

const comboWordsAreEqual = (comboWord: WordCombo, otherComboWord: WordCombo): boolean => {
  return comboWord.words[0] === otherComboWord.words[0] && comboWord.words[1] === otherComboWord.words[1];
}

export { comboWordsAreEqual };
