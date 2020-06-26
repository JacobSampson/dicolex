import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.scss';
import Folderol from './folderol/Folderol';
import Form from './form/Form';
import RepoOverview from './repo-overview/RepoOverview';
import GeneratedWords from './generated-words/GeneratedWords';
import { Word } from '../core/models/word';

const CLASS = 'app';
function App() {
  const [words, updateWords] = useState<Word[]>([]);

  const handleWords = (newWords: Word[]): void => {
    const uniqueNewWords = newWords.filter(newWord => !words.find(oldWord => oldWord.word === newWord.word));

    updateWords([...uniqueNewWords, ...words]);
  }
  
  return (
    <div className={CLASS}>
      <RepoOverview />
      <main className={CLASS + '__main'}>
        <Form addWords={handleWords}/>
        <div className={`${CLASS}__folderol`}>
          <Folderol />
        </div>
      </main>
      <GeneratedWords words={words} />
      {/* <Footer /> */}
    </div>
  );
}

export default App;
