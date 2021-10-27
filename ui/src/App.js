
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddPlayerPage from './pages/AddPlayerPage';
import EditPlayerPage from './pages/EditPlayerPage';
import {useState} from 'react';


function App() {
  const [playerToEdit, setplayerToEdit] = useState();
  return (
    <div className="App">
      <Router>
        <div className="App-header">
          <Route path="/" exact>
            <HomePage setPlayerToEdit={setPlayerToEdit}/>
          </Route>
          <Route path="/add-player">
            <AddPlayerPage/>
          </Route>
          <Route path="/edit-player">
            <EditPlayerPage playerToEdit={playerToEdit}/>
          </Route>
        </div>
      </Router>
    </div>
  );
}

export default App;
