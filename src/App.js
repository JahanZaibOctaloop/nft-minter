// src/App.js

import React from 'react';
import './App.css';
import MintForm from './components/MintForm';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <MintForm />
      </header>
    </div>
  );
}

export default App;
