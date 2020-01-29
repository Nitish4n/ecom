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

    const {name , email, password} = values;

    const buttonSubmitHandler = (e) => {
        e.preventDefault();
        signUp({name, email, password});
    }

    const signUp = (user) => {
        // console.log(name+" "+email+" "+password)
        fetch(`${API}/auth/signup`, {
            method:"POST",
            headers: {
                Accept: 'application/json',
                'content-type': 'application/json'
            },
            body : JSON.stringify(user)
        })
        .then(response => response.json())
        .catch(err => {
            console.log(err)
        })
    }

    const signUpForm = () => (
        <div className="col-md-6 col-md-offset-3">
            <form>
                <div className="form-group">
                    <label for="exampleInputEmail1">Name</label>
                    <input type="text" className="form-control" onChange={handleChange('name')}  placeholder="Enter Name" />
                </div>
                <div className="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control"  onChange={handleChange('email')} placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label for="exampleInputPassword1">Password</label>
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
                {JSON.stringify(values)}
            </Layout>
        </div>
    )
}

export default Signup;