import React from 'react';
import Layout from './Layout';
import {isAuthenticated} from '../auth/index'
import { Link } from 'react-router-dom'


const Dashboard = () => {

    const { user: {_id, name, email, role, history} } = isAuthenticated();

    const userLinks = () => (
        <div className="card">
            <h4 className="card-header">User Links</h4>
            <ul className="list-group">
                <li className="list-group-item">
                    <Link className="nav-link" to="/cart">
                        My cart
                    </Link>
                </li>
                <li className="list-group-item">
                    <Link className="nav-link" to="/profile/update">
                        Update Profile
                    </Link>
                </li>
            </ul>
        </div>
    )

    const userDetails = () => (
        <div className="card md-5">
            <h3 className="card-header">User Information</h3>
            <ul className="list-group">
                <li className="list-group-item">{name}</li>
                <li className="list-group-item">{email}</li>
                <li className="list-group-item">{(role === 0 ? 'Registered User' : 'Admin') }</li>
            </ul>
        </div>
    )


    const orderHistory = () => (
        <div className="card md-5">
            <h3 className="card-header">Purchase History</h3>
            <ul className="list-group">
                <li className="list-group-item">History</li>
            </ul>
        </div>
    )

    return (
        <Layout title="Dashboard" description={`Hey ${name} !`} className="container">
            <div className="row">
                <div className="col-md-3">
                    {userLinks()}
                </div>
                <div className="col-md-9">
                    {userDetails()}
                    {orderHistory()}
                </div>
            </div>
            
        </Layout>
    ) 
}

export default Dashboard;
