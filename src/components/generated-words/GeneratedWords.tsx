import React from 'react';
import './GeneratedWords.scss';
import { generateWordCombos } from '../../core/services/word-comination-service';


interface GeneratedWordsProps {
  words: { word: string, originalWord: string, languageCode: string }[]
}

const CLASS = 'generated-words';
const GeneratedWords = ({ words = [] }: GeneratedWordsProps) => {
  const generatedWords = generateWordCombos(words);
  console.log('words', words)

  return (
    <section className={CLASS}>
      {generatedWords.map(generatedWord => (
        <div className={`${CLASS}__word`} key={`${generatedWord.words[0]}&${generatedWord.words[1]}`}>
          <p className={`${CLASS}__combo`}>{`${generatedWord.words[0]} · ${generatedWord.words[1]}`}</p>
          <p className={`${CLASS}__language`}>{`${generatedWord.languageCodes[0]} · ${generatedWord.languageCodes[1]}`}</p>
          <p className={`${CLASS}__original`}>{`${generatedWord.originalWords[0]}, ${generatedWord.originalWords[1]}`}</p>
          <button className={`${CLASS}__button ${CLASS}__button--icon`}
            type='button'
            onClick={e => {}}><i className="fa fa-floppy-o"></i></button>
        </div>
      ))}
    </section>
  );
}

export default GeneratedWords;
