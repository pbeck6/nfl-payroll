
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import {useState} from 'react';

function App() {
  const [] = useState();
  return (
    <div className="App">
      <Router>
        <div className="App-header">
          <Route path="/" exact>
            <HomePage />
          </Route>
        </div>
      </Router>
    </div>
  );
}

export default App;
