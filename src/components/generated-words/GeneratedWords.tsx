import React, { useState } from 'react';
import './GeneratedWords.scss';
import { WordCombo } from '../../core/models/word-combo';
import { comboWordsAreEqual } from '../../core/utilities/word-combo-helpers';

const MAX_NUM_GENERATED_WORDS = 50;

interface GeneratedWordsProps {
  generatedWords: WordCombo[];
  setGeneratedWords: (generatedWords: WordCombo[]) => void;
}

const CLASS = 'generated-words';
const GeneratedWords = ({ generatedWords = [], setGeneratedWords }: GeneratedWordsProps) => {
  const [pinnedWords, setPinnedWords] = useState<WordCombo[]>([]);
  const [displayUnpinned, toggleDisplayUnpinned] = useState<boolean>(true);

  const isPinnedComboWord = (comboWord: WordCombo): boolean => {
    return !!pinnedWords.find(pinnedWord => comboWordsAreEqual(pinnedWord, comboWord));
  }

  const displayedWords = generatedWords.sort((word, otherWord) =>  +isPinnedComboWord(otherWord) - +isPinnedComboWord(word))
    .filter((word, index) => {
      if (index >= MAX_NUM_GENERATED_WORDS) {
        return false;
      }
      if (!displayUnpinned) {
        return isPinnedComboWord(word);
      }
      return true;}
    );

  const togglePinnedWord = (word: WordCombo) => {
    if (isPinnedComboWord(word)) {
      setPinnedWords(pinnedWords.filter(pinnedWord => !comboWordsAreEqual(pinnedWord, word)));
      return;
    }

    setPinnedWords([word, ...pinnedWords]);
  }

  const hideWords = (): void => {
    toggleDisplayUnpinned(!displayUnpinned);
  }

  const clearWords = (): void => {
    setGeneratedWords(pinnedWords);
  }

  return (
    <section className={CLASS}>
      <div className={`${CLASS}__buttons`}>
        { !!generatedWords.length &&
          (<button className={`${CLASS}__button ${CLASS}__button--label` + ((!pinnedWords.length) ? ` ${CLASS}__button--disabled` : '')}
            type='button'
            onClick={e => hideWords()}>
            { displayUnpinned ? 'hide' : 'show' } unpinned words</button>)
        }
        { !!generatedWords.length &&
          <button className={`${CLASS}__button ${CLASS}__button--label` + ((generatedWords.length === pinnedWords.length) ? ` ${CLASS}__button--disabled` : '')}
            type='button'
            onClick={e => clearWords()}>
            clear unpinned words</button>
        }
      </div>
      {displayedWords.map(generatedWord => (
        <div className={`${CLASS}__word`} key={`${generatedWord.words[0]}_${generatedWord.words[1]}`}>
          <p className={`${CLASS}__combo`}>{`${generatedWord.words[0]}${generatedWord.words[1]}`}</p>
          <p className={`${CLASS}__combo ${CLASS}__combo--light`}>{`${generatedWord.words[0]} · ${generatedWord.words[1]}`}</p>
          <p className={`${CLASS}__language`}>{`${generatedWord.languageCodes[0]} · ${generatedWord.languageCodes[1]}`}</p>
          <p className={`${CLASS}__original`}>{`${generatedWord.originalWords[0]} · ${generatedWord.originalWords[1]}`}</p>
          <button className={`${CLASS}__button ${CLASS}__button--icon` + (isPinnedComboWord(generatedWord) ? ` ${CLASS}__button--active` : '')}
            type='button'
            onClick={e => togglePinnedWord(generatedWord)}><i className="fa fa-thumb-tack" aria-hidden="true"></i></button>
        </div>
      ))}
    </section>
  );
}

export default GeneratedWords;
