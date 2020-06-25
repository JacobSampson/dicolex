import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.scss';
import Folderol from './folderol/Folderol';
import Form from './form/Form';
import RepoOverview from './repo-overview/RepoOverview';
import GeneratedWords from './generated-words/GeneratedWords';

const CLASS = 'app';
function App() {
  const [words, updateWords] = useState<{ word: string, originalWord: string, languageCode: string }[]>([]);
  
  return (
    <div className={CLASS}>
      <RepoOverview />
      <main className={CLASS + '__main'}>
        <Form addWords={updateWords}/>
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
