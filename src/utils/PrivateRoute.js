import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props =>
                localStorage.getItem('token') ? (
                    <Component {...props} />
                ) : (
<<<<<<< HEAD
                    <Redirect to='/dashboard' />

=======
                    <Redirect to='/ChangeThis' />
>>>>>>> parent of bddbf97... Merge branch 'clean-up' of https://github.com/Essentialism-2/Frontend into clean-up
                )
            }
        />
    );
};

export default PrivateRoute;
