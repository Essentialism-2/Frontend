import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
//Components
import ValuesForm from './components/ValuesForm';
import Login from './components/Login';
import Register from './components/Register';
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
                <Router>
                    <Switch>
                        <Route exact path='/' component={Login} />
                        <Route path='/register' component={Register} />
                        <Route path='/values-form' component={ValuesForm} />
                        <PrivateRoute path='/dashboard' ><Dashboard/></PrivateRoute>
                    </Switch>
                </Router>
            </ThemeProvider>
        </div>
    );
};

export default App;
