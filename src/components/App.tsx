import React from 'react';
// import logo from './logo.svg';
import './App.scss';
import Footer from './footer/Footer';
import Folderol from './folderol/Folderol';
import Form from './form/Form';
import RepoOverview from './repo-overview/RepoOverview';

const CLASS = 'app';
function App() {
  return (
    <div className={CLASS}>
      <RepoOverview></RepoOverview>
      <main className={CLASS + '__main'}>
        <Form />
        <div className={`${CLASS}__folderol`}>
          <Folderol />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
