import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.scss';
import Folderol from './folderol/Folderol';
import Form from './form/Form';
import RepoOverview from './repo-overview/RepoOverview';
import GeneratedWords from './generated-words/GeneratedWords';
import { Word } from '../core/models/word';
import { WordCombo } from '../core/models/word-combo';
import { generateWordCombos } from '../core/services/word-combo-service';
import { comboWordsAreEqual } from '../core/utilities/word-combo-helpers';

const CLASS = 'app';
function App() {
  const [generatedWords, setGeneratedWords] = useState<WordCombo[]>([]);
  

  const handleWords = (newWords: Word[]): void => {
    const newGeneratedWords = generateWordCombos(newWords);
    const uniqueGeneratedWords = newGeneratedWords.filter(newGeneratedWord => {
      return !generatedWords.some(generatedWord => comboWordsAreEqual(newGeneratedWord, generatedWord));
    });

    setGeneratedWords([...uniqueGeneratedWords, ...generatedWords]);
  }
  
  return (
    <div className={CLASS}>
      <div className={`${CLASS}__overview`}>
        <RepoOverview />
      </div>
      <main className={CLASS + '__main'}>
        <Form addWords={handleWords}/>
        <div className={`${CLASS}__folderol`}>
          <Folderol />
        </div>
      </main>
      {!!generatedWords.length && <GeneratedWords generatedWords={generatedWords} setGeneratedWords={setGeneratedWords} />}
      {/* <Footer /> */}
    </div>
  );
}

export default App;
