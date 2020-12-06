import React, { useState } from 'react';
import './Form.scss';
import WiktionaryService from '../../core/services/wiktionary-service';
import { LANGUAGE_CODES } from '../../core/constants/language-codes';
import { Word } from '../../core/models/word';

interface FormData {
  words: { value: string, fromLanguage: string, toLanguage: string }[];
  fromLanguage: string;
  toLanguage: string;
  useIndividualLanguage: boolean;
  useMultipleLanguages: boolean;
}

const MAX_WORDS = 5;
const MAX_ERRORS = 1;
const DEFAULT_FROM_LANGUAGE = 'en';
const DEFAULT_TO_LANGUAGE = 'la';

const DEFAULT_FORM_DATA: FormData = {
  words: [],
  fromLanguage: DEFAULT_FROM_LANGUAGE,
  toLanguage: DEFAULT_TO_LANGUAGE,
  useIndividualLanguage: false,
  useMultipleLanguages: true
}

interface FormProps {
  addWords: (words: Word[]) => void;
}
const CLASS = 'form';
const Form = ({ addWords }: FormProps) => {
  const [formData, updateFormData] = useState<FormData>(DEFAULT_FORM_DATA);
  const [currWord, setCurrWord] = useState<string>('');
  const [errors, updateErrors] = useState<string[]>([]);

  const addWord = (newWord: string) => {

    if (formData.words.length >= MAX_WORDS
        || !newWord.length
        || formData.words.some(word => {
          return word.value === newWord.toLocaleLowerCase() &&
                 word.fromLanguage === formData.fromLanguage &&
                 (!formData.useIndividualLanguage || word.toLanguage === formData.toLanguage)})) {
      return false;
    }

    updateFormData({
      ...formData,
      words: [ ...formData.words, { value: newWord.toLocaleLowerCase(), fromLanguage: formData.fromLanguage, toLanguage: formData.toLanguage} ]
    });

    // setCurrWord(''); // Uncomment to auto clear input
  };

  const removeWord = (wordToRemove: { value: string, fromLanguage: string, toLanguage: string }) => {
    updateFormData({
      ...formData,
      words: formData.words.filter(word => !(word.value === wordToRemove.value &&
                                   word.fromLanguage === wordToRemove.fromLanguage &&
                                   (!formData.useIndividualLanguage || (word.toLanguage === wordToRemove.toLanguage))))
    });
  };

  const setToLanguage = (language: string) => {
    updateFormData({
      ...formData,
      toLanguage: language
    })
  };

  const setFromLanguage = (language: string) => {
    updateFormData({
      ...formData,
      fromLanguage: language
    })
  };

  const handleSubmit = (formData: FormData) => {
    let languageMappings: { value: string, fromLanguage: string, toLanguage?: string }[] = [];

    if (formData.useMultipleLanguages) {
      LANGUAGE_CODES.forEach(([code, _]) => {
        formData.words.forEach(word => {
          const languageMapping = {
            ...word,
            toLanguage: code
          };
          languageMappings.push(languageMapping);
        });
      });
    } else {
      languageMappings = formData.words.map(word => {
        const toLang = formData.useIndividualLanguage && word.toLanguage ? word.toLanguage : formData.toLanguage;
        return { ...word, toLanguage: toLang };
      });
    }

    console.log(languageMappings)

    const languagesCalls = languageMappings.map((word: ({ value: string, fromLanguage: string, toLanguage?: string })) => {
      return WiktionaryService.translate(word.value.toLocaleLowerCase(), word.fromLanguage, word.toLanguage)
      .then(words => {
        return words
      }).catch(error => {
        handleError(error);
        return [];
      }) as any as any[];
    });

    Promise.all(languagesCalls)
      .then(words => words.reduce((compiledWords, words) => [...compiledWords, ...words], []))
      .then(compiledWords => addWords(compiledWords));
  }

  const handleError = (newError: Error) => {
    updateErrors([newError.message, ...errors].filter((_, index) => index < MAX_ERRORS));
  }

  const updatedLanguagesOptions = (useIndividual: boolean, useMultiple: boolean) => {
    let uniqueWords = formData.words;
    if (useIndividual || useMultiple) {
      const seenWords: { value: string, fromLanguage: string, toLanguage: string }[] = [];
      uniqueWords = uniqueWords.filter(word => {
        if (seenWords.some(seenWord => seenWord.value === word.value && seenWord.value === word.value)) {
          return false;
        }
        seenWords.push(word);
        return true;
      });
    }

    updateFormData({
      ...formData,
      words: uniqueWords,
      useIndividualLanguage: useIndividual,
      useMultipleLanguages: useMultiple
    });
  }

  return (
    <form className={CLASS} onSubmit={e => { e.preventDefault(); addWord(currWord); }}>
      <div className={`${CLASS}__explanation`}>
        any entered words will have their translations combined to form unique project names with actual meanings
      </div>

      <div className={`${CLASS}__selects` + (formData.useMultipleLanguages ? ` ${CLASS}__selects--disabled` : '')}>
        <select className={`${CLASS}__select ${CLASS}__select--from`}
          value={formData.fromLanguage} onChange={e => setFromLanguage(e.target.value)}>
          {LANGUAGE_CODES.map(([ code, label ]) => {
            return <option className={`${CLASS}__option`} key={code} value={code}>{label.toLocaleLowerCase()}</option>
          })}
        </select>
        <p className={`${CLASS}__arrow`}>→</p>
        <select className={`${CLASS}__select ${CLASS}__select--to`}
          value={formData.toLanguage} onChange={e => setToLanguage(e.target.value)}>
          {LANGUAGE_CODES.map(([ code, label ]) => {
            return <option className={`${CLASS}__option`} key={code} value={code}>{label.toLocaleLowerCase()}</option>
          })}
        </select>
      </div>

      <div className={`${CLASS}__options`}>
        <input type="checkbox" className={`${CLASS}__toggle`}
          checked={formData.useIndividualLanguage}
          onChange={() => updatedLanguagesOptions(!formData.useIndividualLanguage, false)}></input>
        <p>translate individually</p>

        <input type="checkbox" className={`${CLASS}__toggle`}
          checked={formData.useMultipleLanguages}
          onChange={() => updatedLanguagesOptions(false, !formData.useMultipleLanguages)}></input>
        <p>use selected translation set</p>
      </div>

      {formData.words.map(word => (
        <div className={`${CLASS}__word`} key={`${word.value}_${word.fromLanguage}_${word.toLanguage}`}>
          <p>{word.value}</p>
          <p className={`${CLASS}__language`}>{word.fromLanguage + (formData.useIndividualLanguage ? ` · ${word.toLanguage || formData.toLanguage}` : '')}</p>
          <button className={`${CLASS}__button ${CLASS}__button--icon`}
            type='button'
            onClick={e => removeWord(word)}>✕</button>
        </div>
      ))}

      {!!(formData.words.length < MAX_WORDS) &&
        <div className={`${CLASS}__addition`}>
          <input className={`${CLASS}__input`}
            onChange={e => setCurrWord(e.target.value as string)}
            value={currWord}></input>
          <p className={`${CLASS}__language ${CLASS}__language--label`}>
            {`${formData.fromLanguage}${formData.useMultipleLanguages ? '' : ' · ' + formData.toLanguage}`}
            </p>
          <button className={`${CLASS}__button ${CLASS}__button--plus` + (formData.words.length >= MAX_WORDS ? ` ${CLASS}__button--disabled` : '')}
            type='button'
            onClick={e => addWord(currWord)}>+</button>
        </div>
      }
      <p className={`${CLASS}__label`}>
        {formData.words.length >= MAX_WORDS ? 'maximum number of words entered' : 'add new word'}
      </p>

      <div className={`${CLASS}__errors`}>
        {errors.map(error => (
          <p key={error} className={`${CLASS}__error ${CLASS}__error--active`}>{error}</p>
        ))}
      </div>

      <button className={`${CLASS}__button ${CLASS}__button--submit` + (!formData.words.length || formData.fromLanguage === formData.toLanguage ? ` ${CLASS}__button--disabled` : '')}
        type='button'
        onClick={() => handleSubmit(formData)}>
          generate
        </button>
    </form>
  );
} 

export default Form;
