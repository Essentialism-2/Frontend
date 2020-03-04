import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import ValuesForm from './components/ValuesForm';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import SignOut from './components/SignOut';
import Dashboard from './components/Dashboard';
import TopThree from './components/TopThree';

const App = () => {
    return (
        <div className='App'>
            <Switch>
                <Route exact path='/' component={LandingPage} />
                <Route path='/login'>
                    <Login />
                </Route>
                <Route path='/register'>
                    <Register />
                </Route>
                <Route path='/values-form'>
                    <ValuesForm />
                </Route>
                <Route path='/signout'>
                    <SignOut />
                </Route>
                <Route path='/dashboard' component={Dashboard} />
            </Switch>
        </div>
    );
};

export default App;
