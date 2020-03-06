import React from 'react';
import { withRouter } from 'react-router-dom';
//Styling
import { makeStyles } from '@material-ui/core/styles';
import { Button, Card } from '@material-ui/core';
//Auth
import { axiosWithAuth } from '../utils/axiosWithAuth';
//Components
import useForm from './useForm';
import validate from './validateLogin';

const useStyles = makeStyles(theme => ({
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginBottom: '10px',
        background: theme.pallette.primary.main,
        '&:hover': {
            background: theme.pallette.primary.dark
        }
    }
}));

const Login = props => {
    const { handleChange, handleSubmit, values, errors } = useForm(
        submit,
        validate
    );
    const classes = useStyles();

    function submit() {
        axiosWithAuth()
            .post('/users/login', values)
            .then(res => {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('id', res.data.id);
                props.history.push('/dashboard');
                console.log(res);
            })
            .catch(err => {
                alert('Incorrect Login');
                console.log('API Error ', err);
            });
    }

    return (
        <Card style={{ width: '400px', margin: '100px auto', padding: '20px' }}>
            <h2>Login page</h2>
            <form onSubmit={handleSubmit} noValidate>
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

                <Button
                    className={classes.button}
                    type='submit'
                    color='primary'
                    variant='contained'>
                    Submit
                </Button>
            </form>
            <span>
                Don't have an account? Sign up <a href='/register'>here</a>
            </span>
        </Card>
    );
};

export default withRouter(Login);
