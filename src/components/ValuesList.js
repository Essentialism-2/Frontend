import React, { useState, useEffect, useContext } from 'react';
//Styling
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Checkbox,
    Button,
    Paper
} from '@material-ui/core';
//Auth
import { axiosWithAuth } from '../utils/axiosWithAuth';
//Context
import { RightContext } from '../utils/store';
//Components
import Value from './Value';
import OtherForm from './OtherForm';

const useStyles = makeStyles(theme => ({
    root: {
        margin: 'auto'
    },
    paper: {
        width: 400,
        height: 'auto',
        overflow: 'auto'
    },
    button: {
        margin: theme.spacing(0.5, 0),
        background: theme.pallette.primary.main,
        '&:hover': {
            background: theme.pallette.primary.dark
        },
        color: 'white'
    }
}));

function not(a, b) {
    return a.filter(value => b.indexOf(value) === -1);
}

function intersection(a, b) {
    return a.filter(value => b.indexOf(value) !== -1);
}

const ValuesList = () => {
    useEffect(() => {
        axiosWithAuth()
            .get('/values')
            .then(res => {
                console.log('GET response', res);
                setLeft(res.data);
            })
            .catch(err => `GET error: ${err}`);
    }, []);

    const classes = useStyles();
    const [checked, setChecked] = useState([]);
    const [left, setLeft] = useState([]);
    const [right, setRight] = useContext(RightContext);

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const handleToggle = value => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
    };
    console.log('Checked', checked);

    const customList = left => (
        <Paper className={classes.paper}>
            <List dense component='span' role='list'>
                {left.map(value => {
                    const labelId = `transfer-list-item-${value}-label`;
                    return (
                        <ListItem
                            key={value.id}
                            role='listitem'
                            button
                            onClick={handleToggle(value)}>
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText
                                id={labelId}
                                primary={
                                    <Value
                                        name={value.name}
                                        description={value.description}
                                    />
                                }
                            />
                        </ListItem>
                    );
                })}
                <ListItem />
            </List>
        </Paper>
    );

    return (
        <>
            <Grid
                container
                spacing={2}
                justify='center'
                alignItems='center'
                className={classes.root}>
                <Grid item>{customList(left)}</Grid>
                <Grid item>
                    <Grid container direction='column' alignItems='center'>
                        <Button
                            variant='outlined'
                            size='small'
                            className={classes.button}
                            onClick={handleCheckedRight}
                            disabled={leftChecked.length === 0}
                            aria-label='move selected right'>
                            &gt;
                        </Button>
                        <Button
                            variant='outlined'
                            size='small'
                            className={classes.button}
                            onClick={handleCheckedLeft}
                            disabled={rightChecked.length === 0}
                            aria-label='move selected left'>
                            &lt;
                        </Button>
                    </Grid>
                </Grid>
                <Grid item>{customList(right)}</Grid>
            </Grid>
            <OtherForm />
        </>
    );
};

export default ValuesList;
