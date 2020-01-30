import React, { useState } from 'react';
import Layout from '../core/Layout';
import { API } from '../config';

const Signup = () => {

    const [values, setValues] = useState({
        name: '',
        email:'',
        password:'',
        error: '',
        success: false
    })


    const handleChange = name => event => {
        setValues({...values, error:false , [name] : event.target.value})
    }

    const {name , email, password, error, success} = values;

    const buttonSubmitHandler = (e) => {
        e.preventDefault();
        signupApi({ name, email, password }).then(data => {console.log(data)})
        
        
    }

    const signupApi = (user) => {
        // console.log(name+" "+email+" "+password)
         fetch(`${API}/auth/signup`, {
            method:"POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(user)
        })
        .then(response => ( response.json()
        ))
        .catch(err => {
            console.log('No')
            console.log(err)
        })
    }

    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    )


    const showSuccess = () => (
        <div className="alert alert-info" style={{display: success ? '' : 'none'}}>
            New Account is Created. Please Login
        </div>
    )

    const signUpForm = () => (
        <div className="col-md-6 col-md-offset-3">
            {showError()}
            {showSuccess()}
            <form>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control" onChange={handleChange('name')}  placeholder="Enter Name" />
                </div>
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control"  onChange={handleChange('email')} placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" onChange={handleChange('password')}  placeholder="Password" />
                </div>
                <button type="submit" onClick={buttonSubmitHandler} className="btn btn-primary">Submit</button>
            </form>
        </div>
    )


    return (
        <div>
            <Layout title="Sign Up" description="Please Sign up For Profile Access" >
                {signUpForm()}
            </Layout>
        </div>
    )
}

export default Signup;