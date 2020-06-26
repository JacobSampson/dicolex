import React, { useState } from 'react';
import './GeneratedWords.scss';
import { generateWordCombos } from '../../core/services/word-comination-service';
import { WordCombo } from '../../core/models/word-combo';
import { Word } from '../../core/models/word';

const MAX_NUM_GENERATED_WORDS = 50;

interface GeneratedWordsProps {
  words: Word[];
}

const CLASS = 'generated-words';
const GeneratedWords = ({ words = [] }: GeneratedWordsProps) => {
  const [pinnedWords, setPinnedWords] = useState<WordCombo[]>([]);
  const [displayUnpinned, toggleDisplayUnpinned] = useState<boolean>(true);

  const isPinnedComboWord = (comboWord: WordCombo): boolean => {
    return !!pinnedWords.find(pinnedWord => comboWordsAreEqual(pinnedWord, comboWord));
  }

  const comboWordsAreEqual = (comboWord: WordCombo, otherComboWord: WordCombo): boolean => {
    return comboWord.words[0] === otherComboWord.words[0] && comboWord.words[1] === otherComboWord.words[1];
  }
  
  const generatedWords = generateWordCombos(words).sort((word, otherWord) =>  +isPinnedComboWord(otherWord) - +isPinnedComboWord(word));
  const displayedWords = generatedWords.filter((word, index) => {
    if (index >= MAX_NUM_GENERATED_WORDS) {
      return false;
    }
    if (!displayUnpinned) {
      return isPinnedComboWord(word);
    }
    return true;
  });

  const togglePinnedWord = (word: WordCombo) => {
    if (isPinnedComboWord(word)) {
      setPinnedWords(pinnedWords.filter(pinnedWord => !comboWordsAreEqual(pinnedWord, word)));
      return;
    }

    setPinnedWords([word, ...pinnedWords]);
  }

  const clearWords = (): void => {
    toggleDisplayUnpinned(!displayUnpinned);
  }

  return (
    <section className={CLASS}>
      { (generatedWords.length) && <button className={`${CLASS}__button ${CLASS}__button--label`} type='button'onClick={e => clearWords()}>
        { displayUnpinned ? 'hide' : 'show' } unpinned words</button> }
      {displayedWords.map(generatedWord => (
        <div className={`${CLASS}__word`} key={`${generatedWord.words[0]}&${generatedWord.words[1]}`}>
          <p className={`${CLASS}__combo`}>{`${generatedWord.words[0]} · ${generatedWord.words[1]}`}</p>
          <p className={`${CLASS}__original`}>{`${generatedWord.originalWords[0]} · ${generatedWord.originalWords[1]}`}</p>
          <p className={`${CLASS}__language`}>{`${generatedWord.languageCodes[0]} · ${generatedWord.languageCodes[1]}`}</p>
          <button className={`${CLASS}__button ${CLASS}__button--icon` + (isPinnedComboWord(generatedWord) ? ` ${CLASS}__button--active` : '')}
            type='button'
            onClick={e => togglePinnedWord(generatedWord)}><i className="fa fa-thumb-tack" aria-hidden="true"></i></button>
        </div>
      ))}
    </section>
  );
}

export default GeneratedWords;
