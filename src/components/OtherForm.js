import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(0.5, 0),
        background: theme.pallette.primary.main,
        '&:hover': {
            background: theme.pallette.primary.dark
        },
        color: 'white'
    }
}));

const OtherForm = props => {
    const [value, setValue] = useState([{ name: null }]);
    const classes = useStyles();
    const userID = localStorage.getItem('id');

    function handleChange(i, event) {
        const values = [...value];
        values[i].name = event.target.value;
        setValue(values);
    }

    function handleChangeDescription(i, event) {
        const values = [...value];
        values[i].description = event.target.value;
        setValue(values);
    }

    function handleAdd() {
        if (!value[value.length - 1].name) {
            alert('Must enter a value');
        } else {
            const values = [...value];
            values.push({ name: null });
            setValue(values);
            addValue(value[value.length - 1]);
        }
    }

    function addValue(value) {
        axiosWithAuth()
            .post('/values', value)
            .then(res => {
                assignValue(res.data[0]);
            })
            .catch(err => {
                alert('Failed to add value');
                console.log('Unable to add value: ', err);
            });
    }

    function assignValue(valueID) {
        axiosWithAuth()
            .post(`/values/user/${userID}`, { value_id: valueID })
            .then(res => {
                console.log(res);
                alert('Value successfully added');
            })
            .catch(err => {
                console.log('Assigning Value not working: ', err);
            });
    }

    return (
        <div>
            <h1>Custom Values</h1>
            <span>Don't like whay you see? Add your own.</span>

            {value.map((field, index) => {
                return (
                    <div key={`${field}-${index}`}>
                        <input
                            type='text'
                            name='description'
                            placeholder='Value'
                            onChange={e => handleChange(index, e)}
                        />
                        <input
                            type='text'
                            name='description'
                            placeholder='Description (Optional)'
                            onChange={e => handleChangeDescription(index, e)}
                        />
                    </div>
                );
            })}

            <Button
                className={classes.button}
                type='button'
                onClick={() => handleAdd()}>
                Add Value
            </Button>
        </div>
    );
};

export default OtherForm;
