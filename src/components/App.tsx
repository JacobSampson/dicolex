import React, { useEffect, useState } from 'react';
// import logo from './logo.svg';
import './App.scss';
import Footer from './footer/Footer';
import Folderol from './folderol/Folderol';
import Form from './form/Form';
import RepoOverview from './repo-overview/RepoOverview';
import GeneratedWords from './generated-words/GeneratedWords';

const CLASS = 'app';
function App() {
  const [words, updateWords] = useState<{ word: string, originalWord: string, languageCode: string }[]>([]);

  const addWords = (newWords: { word: string, originalWord: string, languageCode: string }[]) => {
    const otherWords: string[] = [];
    updateWords([...words, ...newWords].filter(word => {
      if (otherWords.some(otherWord => otherWord === word.word)) {
        return false;
      }
      otherWords.push(word.word);
      return true;
    }));
  }
  
  return (
    <div className={CLASS}>
      <RepoOverview />
      <main className={CLASS + '__main'}>
        <Form addWords={addWords}/>
        <div className={`${CLASS}__folderol`}>
          <Folderol />
        </div>
        <GeneratedWords words={words} />
      </main>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
