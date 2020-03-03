import React from 'react';
import useForm from "./useForm";
import validate from "./validateLogin"
import Card from '@material-ui/core/Card';
import { Button } from '@material-ui/core';

const Login = () => {
	const { handleChange, handleSubmit, values, errors } = useForm(submit, validate);
	
	function submit() {
		console.log("Submitted!");
	}

	return (
		<Card style={{width: "400px", margin: "20px auto"}}>
			<h2>Login page</h2>
			<form onSubmit={handleSubmit} noValidate>

				<div>
					<label>Email</label>
					<div>
						<input 
							className={`${errors.email && "inputError"}`}
							name="email" 
							type="email" 
							value={values.email} 
							onChange={handleChange}
						/>
						{errors.email && <p className="error">{errors.email}</p>}
					</div>
				</div>

				<div>
					<label>Password</label>
					<div>
						<input 
							className={`${errors.password && "inputError"}`}
							name="password" 
							type="password" 
							value={values.password}
							onChange={handleChange}
						/>
						{errors.password && <p className="error">{errors.password}</p>}
					</div>
				</div>

				<Button type="submit">Submit</Button>

			</form>
		</Card>
	);
};

export default Login;