import React from 'react';
import { withRouter } from 'react-router-dom';
//Styling
import { Button, Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1)
    }
}));

const SignOut = props => {
    const classes = useStyles();

    const logout = () => {
        localStorage.clear('token');
        props.history.push('/');
    };

    return (
        <Card>
            <Button
                onClick={logout()}
                className={classes.button}
                color='primary'
                variant='contained'>
                Sign Out
            </Button>
        </Card>
    );
};

export default withRouter(SignOut);
