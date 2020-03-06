import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
//Components
import ValuesForm from './components/ValuesForm';
import Login from './components/Login';
import Register from './components/Register';
import SignOut from './components/SignOut';
import Dashboard from './components/Dashboard';
import PrivateRoute from './utils/PrivateRoute';
//Styling
import './App.css';
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
                    <PrivateRoute
                        exact
                        path='/dashboard'
                        component={Dashboard}
                    />
                    <Route exact path='/' component={Login} />
                    <Route path='/register' component={Register} />
                    <Route path='/values-form' component={ValuesForm} />
                    <Route path='/signout' component={SignOut} />
                </Switch>
            </ThemeProvider>
        </div>
    );
};

export default withRouter(App);
