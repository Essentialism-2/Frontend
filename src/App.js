import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './components/landingPage';

import './App.css';
import Login from './components/login';
import Register from './components/register';

function App() {
    return (
        <Router>
            <div className='App'>
              <Switch>
                <Route exact path='/' component={LandingPage} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/register' component={Register} />
              </Switch>
            </div>
        </Router>
    );
}


export default App;
