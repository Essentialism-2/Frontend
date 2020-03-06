import React, { useEffect, useContext } from 'react';
//Styling
import { Grid, List, ListItem, ListItemText, TextField, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
//Auth
import { axiosWithAuth } from '../utils/axiosWithAuth';
//Context
import { RightContext, DescriptionContext } from '../utils/store';
//Components
import Value from './Value';

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
        '&:hover':{
            background: theme.pallette.primary.dark
        }

    },
    textField: {
        width: 370,
        background: '#CCE6FF'
    }
}));


const FinalValues = () => {
    const classes = useStyles();
    const [right, setRight] = useContext(RightContext);
    const [description, setDescription] = useContext(DescriptionContext);

    useEffect(() => {
        const userId = localStorage.getItem('id');
        axiosWithAuth()
            .get(`/values/user/${userId}`)
            .then(res => {
                console.log('Final GET response', res);
                const result = res.data.filter(item => item.Top_Three == true);
                console.log('Result', result);
                setRight(result);
            })
            .catch(err => console.log('Final GET error', err));
    }, []);

    console.log('Final GET state', right);

    const handleChange = e => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        setDescription({
            [name]: value
        });
    };

    console.log('Final description', description)

    const customList = right => (
        <Paper className={classes.paper}>
            <List dense component='span' role='list'>
                {right.map(value => {
                    return (
                        <ListItem key={value.id} role='listitem'>
                            <ListItemText
                                primary={
                                    <>
                                        <Value name={value.Value_name} />
                                        <TextField
                                            name='description'
                                            placeholder={
                                                value.Value_description
                                            }
                                            className={classes.textField}
                                            onChange={handleChange}
                                            required id='standard-required'
                                            id='filled-basic'
                                            error id='standard-error-helper-text'
                                            helperText='Required'
                                            variant='filled'
                                            multiline
                                        />
                                    </>
                                }
                            />
                        </ListItem>
                    );
                })}
            </List>
        </Paper>
    );

    return (
        <Grid
            container
            spacing={2}
            justify='center'
            alignItems='center'
            className={classes.root}>
            <Grid item>{customList(right)}</Grid>
            <Grid item>
                <Grid container direction='column' alignItems='center'></Grid>
            </Grid>
        </Grid>
    );
};

export default FinalValues;
