import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import { Button } from '@material-ui/core';

const LandingPage = () => {
    return (
        <Card style={{width: "400px", margin: "20px auto"}}>
            <Link to='/login'><Button>Login</Button></Link>
            <Link to='/register'><Button>Sign Up</Button></Link>
        </Card>
    );
};

export default LandingPage;