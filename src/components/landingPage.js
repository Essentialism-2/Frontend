import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

const LandingPage = () => {
    return (
        <div>
            <Link to='/login'>
                <Button>Login</Button>
            </Link>
            <Link to='/register'>
                <Button>Sign Up</Button>
            </Link>
        </div>
    );
};

export default LandingPage;
