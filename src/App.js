import React from 'react';
import LandingPage from './components/LandingPage';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
//Components
import ValuesForm from './components/ValuesForm';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import PrivateRoute from './utils/PrivateRoute';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    pallette: {
        primary: {
            main: '#38B4E2',
            dark: '#006666'
        }
    }
});

const App = () => {
    return (
        <div className='App'>
            <ThemeProvider theme={theme}>
                <Switch>
                    <Route exact path='/' component={LandingPage} />
                    <Route path='/login' component={Login} />
                    <Route path='/register' component={Register} />
                    <PrivateRoute path='/dashboard' component={Dashboard} />
                    <Route path='/values-form' component={ValuesForm} />>
                    <Route path='/signout' component={SignOut} />
                </Switch>
            </ThemeProvider>
        </div>
    );
};

export default App;
