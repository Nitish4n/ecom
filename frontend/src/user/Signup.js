import React, { useState } from 'react';
import Layout from '../core/Layout';

const Signup = () => {

    const [values, setValues] = useState({
        name: '',
        email:'',
        password:'',
        error: '',
        success: false
    })


    const handleChange = name => event => {
        console.log(name+"  "+event.target.value)
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
                <button type="submit" className="btn btn-primary">Submit</button>
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