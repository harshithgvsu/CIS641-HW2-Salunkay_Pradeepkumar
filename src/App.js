// src/App.js
import React from 'react';
import SwipeableDeck from './components/SwipeableDeck';
import jobs from './data/jobs';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>JobSwipe</h1>
        <p>Swipe right to apply, left to skip</p>
      </header>
      <ErrorBoundary>
        <SwipeableDeck jobs={jobs} />
      </ErrorBoundary>
    </div>
  );
}

export default App;
