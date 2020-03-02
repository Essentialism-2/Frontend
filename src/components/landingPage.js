import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

const LandingPage = () => {
    return (
        <div>
            <Link to='/login'>
                <button>Login</button>
            </Link>
            <Link to='/register'>
                <button>Sign Up</button>
            </Link>
        </div>
    );
};

export default LandingPage;
