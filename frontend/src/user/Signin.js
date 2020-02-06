import React, { useState } from 'react';
import {Redirect} from 'react-router-dom';
import Layout from '../core/Layout';
import { signInAPI , authenticate, isAuthenticated} from '../auth'

import { connect } from 'react-redux'

const Signin = (props) => {
    console.log(props)
    const [values, newValues] = useState({
        email: props.email,
        password: '123456',
        error : '',
        loading: false,
        success: false,
        redirectToReferrer: false
    })

    const {user} = isAuthenticated();
    

    const inputChange = name => event => {
        // console.log(event.target.value)
        newValues({...values, error:false, [name]:event.target.value})
    }
    const {email, password, error, success , loading, redirectToReferrer } = values;


    const SignInSubmit = (e) => {
        newValues({...values, loading: true})
        e.preventDefault();
        props.changeEmail(email);
        signInAPI({email, password})
        .then(response => {
            if(response.error){
                newValues({
                    ...values,
                    error: response.error,
                    success: false,
                    loading: false
                })
            }else{
                authenticate(response , () => {
                    newValues({
                        ...values,
                        email: '',
                        password:'',
                        error: '',
                        success: true,
                        loading: false,
                        redirectToReferrer: true
                    })
                })
                
            }
        }).catch(err => {
            console.log(err)
        })
    }

    

    const showError = () => (
        <div className='alert alert-danger' style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    )

    const showSuccess = () => (
        <div className='alert alert-info' style={{display: success ? '' : 'none'}}>
            Sign In successfull.
        </div>
    )

    const showLoading = () => (
        <div className='alert alert-default' style={{display: loading ? '' : 'none'}}>
            Signing In...
        </div>
    )

    const redirectUser = () => {
        if(redirectToReferrer){
            if(user && user.role === 1){
                return <Redirect to="/admin/dashboard" />
            }else{
                return <Redirect to="/user/dashboard" />
            }
        }
    }

    const signInForm = () => (
        <div className="col-md-6 col-md-offset-3">
            {showSuccess()}
            {showError()}
            {showLoading()}
            {redirectUser()}
            <form>
                <div className="form-group">
                    <label >Email address</label>
                    <input type="email" className="form-control" onChange={inputChange('email')} value={email} placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label >Password</label>
                    <input type="password" className="form-control" onChange={inputChange('password')} value={password} placeholder="Password" />
                </div>
                <button type="submit" onClick={SignInSubmit} className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
    return (
        <div>
            <Layout title="Sign In" description="Please Sign in For Profile Access" >
                
                {signInForm()}
            </Layout>
        </div>
    )
}

const mapStateProps = (state) => {
    return {
        name : state.name,
        email: state.email
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeEmail:(email) => {
            dispatch({type:'CHANGE_EMAIL', payload:email})
        }
    }
}

export default connect(mapStateProps, mapDispatchToProps)(Signin);