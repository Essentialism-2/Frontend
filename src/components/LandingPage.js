import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1)
    }
}));

const LandingPage = props => {
    const classes = useStyles();

    return (
        <Card style={{ width: '400px', margin: '20px auto' }}>
            <Link to='/login' style={{ textDecoration: 'none' }}>
                <Button
                    className={classes.button}
                    color='primary'
                    variant='contained'>
                    Login
                </Button>
            </Link>
            <Link to='/register' style={{ textDecoration: 'none' }}>
                <Button
                    className={classes.button}
                    color='primary'
                    variant='contained'>
                    Sign Up
                </Button>
            </Link>
            <Link to='/signout' style={{ textDecoration: 'none' }}>
                <Button
                    className={classes.button}
                    color='primary'
                    variant='contained'>
                    Sign Out
                </Button>
            </Link>
        </Card>
    );
};

export default LandingPage;
