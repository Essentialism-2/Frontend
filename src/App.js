import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import './App.css';

function App() {
    return (
        <Router>
            <div className='App'>
              <Switch>
                <Route exact path='/' component={LandingPage} />
              </Switch>
            </div>
        </Router>
    );
}

export default App;
