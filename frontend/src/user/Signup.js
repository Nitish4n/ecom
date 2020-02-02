import React, { useState } from 'react';
import Layout from '../core/Layout';
import { API } from '../config';
import { Link } from 'react-router-dom';
import { signupApi } from '../auth'
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
        signupApi({ name, email, password })
        .then(data => {
            if(data.error){
                setValues({
                    ...values, error: data.error, success:false
                })
            }else{
                setValues({
                    ...values, 
                    name:'',
                    email:'',
                    password:'',
                    error: '', 
                    success:true
                })
            }
        })
        
        
    }

    

    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    )


    const showSuccess = () => (
        <div className="alert alert-info" style={{display: success ? '' : 'none'}}>
            New Account is Created. Please <Link to="/signin">Sign In</Link>
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