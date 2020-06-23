import React from 'react';
import './GeneratedWords.scss';
import { generateWordCombos } from '../../core/services/word-comination-service';


interface GeneratedWordsProps {
  words: { word: string, originalWord: string, languageCode: string }[]
}

const CLASS = 'generated-words';
const GeneratedWords = ({ words = [] }: GeneratedWordsProps) => {
  const generatedWords = generateWordCombos(words);

  return (
    <section className={CLASS}>
      {generatedWords.map(generatedWord => (
        <div className={`${CLASS}__word`} key={`${generatedWord.words[0]}&${generatedWord.words[1]}`}>
          <p className={`${CLASS}__combo`}>{`${generatedWord.words[0]} · ${generatedWord.words[1]}`}</p>
          <p className={`${CLASS}__language`}>{`${generatedWord.languageCodes[0]} · ${generatedWord.languageCodes[1]}`}</p>
          {/* <p className={`${CLASS}__original`}>{`${generatedWord.originalWords[0]}, ${generatedWord.originalWords[1]}`}</p> */}
        </div>
      ))}
    </section>
  );
}

export default GeneratedWords;
