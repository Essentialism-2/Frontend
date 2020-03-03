import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import LandingPage from './components/LandingPage';
import ValuesForm from './components/ValuesForm';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';

const App = () => {
    return (
        <Router>
            <div className='App'>
              <Switch>
                <Route exact path='/' component={LandingPage} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/values-form' component={ValuesForm} />
              </Switch>
            </div>
        </Router>
    );
}


export default App;
