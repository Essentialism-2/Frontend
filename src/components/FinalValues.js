import React, { useEffect, useContext } from 'react';
import Value from './Value';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { RightContext, DescriptionContext } from '../utils/store';

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
        height: 'auto'
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
                                            // label='Why is this important to you?'
                                            onChange={handleChange}
                                            id='filled-basic'
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
