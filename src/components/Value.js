import React from 'react';
//Styling
import { Card, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        minWidth: 275
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)'
    },
    title: {
        fontSize: 18
    },
    pos: {
        marginBottom: 12
    }
});

const Value = props => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography
                    className={classes.title}
                    variant='h6'
                    component='h2'>
                    {props.name}
                </Typography>
                <Typography variant='body2' component='p'>
                    {props.description}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default Value;
