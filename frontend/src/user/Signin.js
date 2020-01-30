import React, { useState } from 'react';
import Layout from '../core/Layout';
import { API } from '../config';

const Signin = () => {

    const [values, newValues] = useState({
        email: '',
        password: '',
        error : '',
        success: false,
    })

    const inputChange = name => event => {
        // console.log(event.target.value)
        newValues({...values, error:false, [name]:event.target.value})
    }
    const {email, password, error, success } = values;


    const SignInSubmit = (e) => {
        e.preventDefault();
        signInAPI({email, password})
    }

    const signInAPI = (user) => {
        console.log(user);
        fetch(`${API}/auth/signin`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(response => response.json())
        .catch(err => console.log(err))
    }

    const signInForm = () => (
        <div className="col-md-6 col-md-offset-3">
            <form>
                <div className="form-group">
                    <label >Email address</label>
                    <input type="email" className="form-control" onChange={inputChange('email')} placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label >Password</label>
                    <input type="password" className="form-control" onChange={inputChange('password')} placeholder="Password" />
                </div>
                <button type="submit" onClick={SignInSubmit} className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
    return (
        <div>
            <Layout title="Sign In" description="Please Sign in For Profile Access" >
                {signInForm()}
                {JSON.stringify(values)}
            </Layout>
        </div>
    )
}

export default Signin;