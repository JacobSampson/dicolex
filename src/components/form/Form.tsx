import React, { useEffect, useState, ReactElement } from 'react';
import './Form.scss';
import WiktionaryService from '../../core/services/wiktionary-service';
import { LANGUAGE_CODES } from '../../core/constants/language-codes';

interface FormData {
  words: { value: string, languageCode: string }[];
  fromLanguage: string;
  toLanguage: string;
}

const MAX_WORDS = 3;
const DEFAULT_FROM_LANGUAGE = 'en';
const DEFAULT_TO_LANGUAGE = 'la';

const DEFAULT_FORM_DATA: FormData = {
  words: [],
  fromLanguage: DEFAULT_FROM_LANGUAGE,
  toLanguage: DEFAULT_TO_LANGUAGE,
}

interface FormProps {
  addWords: (words: { word: string, originalWord: string, languageCode: string }[]) => void;
}
const CLASS = 'form';
const Form = ({ addWords }: FormProps) => {
  const [formData, updateFormData] = useState<FormData>(DEFAULT_FORM_DATA);
  const [currWord, updateCurrWord] = useState<string>('');
  const [errors, updateErrors] = useState<string[]>([]);

  const addWord = (newWord: string) => {
    if (formData.words.length >= MAX_WORDS || !newWord.length || formData.words.some(word => word.value === newWord)) {
      return false;
    }

    updateFormData({
      ...formData,
      words: [ ...formData.words, { value: newWord, languageCode: formData.fromLanguage} ]
    });
  };

  const removeWord = (wordToRemove: string) => {
    updateFormData({
      ...formData,
      words: formData.words.filter(word => word.value !== wordToRemove)
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
    console.log(formData);

    formData.words.map(word => {
      return WiktionaryService.translate(word.value, word.languageCode, formData.toLanguage)
        .then(words => {
          console.log(words)
          addWords(words);
        })
        .catch(error => handleError(error))
    });
  };

  const handleError = (newError: Error) => {
    const otherErrors: string[] = [];
    updateErrors([newError.message, ...errors].filter((error, index) => {
      if (index >= MAX_WORDS || !otherErrors.includes(error)) {
        return false;
      }
      otherErrors.push(error);
      return true;
    }));
  }

  return (
    <form className={CLASS}>
      <div className={`${CLASS}__addition`}>
        <input className={`${CLASS}__input`} placeholder='' onChange={e => updateCurrWord(e.target.value as string)}></input>
        <button className={`${CLASS}__button ${CLASS}__button--plus` + (formData.words.length >= MAX_WORDS ? ` ${CLASS}__button--disabled` : '')}
          type='button'
          onClick={e => addWord(currWord)}>+</button>
      </div>
      <p className={`${CLASS}__label`}>add new word</p>

      <div className={`${CLASS}__selects`}>
        <select className={`${CLASS}__select ${CLASS}__select--from`} value={formData.fromLanguage} onChange={e => setFromLanguage(e.target.value)}>
          {LANGUAGE_CODES.map(([ code, label ]) => {
            return <option className={`${CLASS}__option`} key={code} value={code}>{label.toLocaleLowerCase()}</option>
          })}
        </select>
        <p className={`${CLASS}__arrow`}>→</p>
        <select className={`${CLASS}__select ${CLASS}__select--to`} value={formData.toLanguage} onChange={e => setToLanguage(e.target.value)}>
          {LANGUAGE_CODES.map(([ code, label ]) => {
            return <option className={`${CLASS}__option`} key={code} value={code}>{label.toLocaleLowerCase()}</option>
          })}
        </select>
      </div>

      <div className={`${CLASS}__errors`}>
        {errors.map(error => (
          <p key={error} className={`${CLASS}__error`}>{error}</p>
        ))}
      </div>

      {formData.words.map(word => (
        <div className={`${CLASS}__word`} key={word.value}>
          <p>{word.value}</p>
          <p className={`${CLASS}__language`}>{word.languageCode}</p>
          <button className={`${CLASS}__button ${CLASS}__button--minus`}
            type='button'
            onClick={e => removeWord(word.value)}>✕</button>
        </div>
      ))}
      <button className={`${CLASS}__button ${CLASS}__button--submit` + (!formData.words.length || formData.fromLanguage === formData.toLanguage ? ` ${CLASS}__button--disabled` : '')}
        type='button'
        onClick={() => handleSubmit(formData)}>
          generate
        </button>
    </form>
  );
} 

export default Form;
