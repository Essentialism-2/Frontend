import React from 'react';
import useForm from './useForm';
import { makeStyles } from '@material-ui/core/styles';
import validate from './validateLogin';
import Card from '@material-ui/core/Card';
import { Button } from '@material-ui/core';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
        background: theme.pallette.primary.main,
        '&:hover':{
            background: theme.pallette.primary.dark
        }

    }
}));

const Login = props => {
    const { handleChange, handleSubmit, values, errors } = useForm(
        submit,
        validate
	);
	const classes = useStyles()
    // const [user, setUser] = useState({})

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
                console.log('API Error ', err);
            });
    }

    return (
        <Card style={{ width: '400px', margin: '20px auto' }}>
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
        </Card>
    );
};

export default withRouter(Login);
