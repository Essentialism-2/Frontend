import React from 'react';
import { withRouter } from 'react-router-dom';
//Styling
import { Button, Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
//Auth
import { axiosWithAuth } from '../utils/axiosWithAuth';
//Components
import useForm from './useForm';
import validate from './validateLogin';

const useStyles = makeStyles(theme => ({
    button: {
        background: theme.pallette.primary.main,
        '&:hover': {
            background: theme.pallette.primary.dark
        },
        margin: '10px auto' 
    }
}));

const Register = props => {
    const classes = useStyles();
    const { handleChange, handleSubmit, values, errors } = useForm(
        submit,
        validate
    );

    function submit() {
        console.log('Submitted!');
        axiosWithAuth()
            .post('/users/register', values)
            .then(res => {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('id', res.data.id);
                props.history.push('/values-form');
                console.log(res);
            })
            .catch(err => {
                alert('All fields are required');
                console.log('API Error ', err);
            });
    }

    return (
        <Card style={{ width: '400px', margin: '100px auto', padding: '20px' }}>
            <h2>Create Account</h2>
            <form onSubmit={handleSubmit} noValidate>
                <div>
                    <label>Name</label>
                    <div>
                        <input
                            className={`${errors.name && 'inputError'}`}
                            name='name'
                            type='name'
                            value={values.name}
                            onChange={handleChange}
                        />
                        {errors.name && <p className='error'>{errors.name}</p>}
                    </div>
                </div>

                <div>
                    <label>Email</label>
                    <div>
                        <input
                            className={`${errors.email && 'inputError'}`}
                            name='email'
                            type='email'
                            value={values.email}
                            onChange={handleChange}
                        />
                        {errors.email && (
                            <p className='error'>{errors.email}</p>
                        )}
                    </div>
                </div>

                <div>
                    <label>Password</label>
                    <div>
                        <input
                            className={`${errors.password && 'inputError'}`}
                            name='password'
                            type='password'
                            value={values.password}
                            onChange={handleChange}
                        />
                        {errors.password && (
                            <p className='error'>{errors.password}</p>
                        )}
                    </div>
                </div>

                <Button type='submit' className={classes.button}>
                    Submit
                </Button>
            </form>
            <span>Already have an account? Sign in <a href="/">here</a></span>
        </Card>
    );
};

export default withRouter(Register);
