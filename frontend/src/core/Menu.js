import React , {Fragment} from 'react';
import { Link , withRouter} from 'react-router-dom';
import { signOutApi, isAuthenticated } from '../auth';


const isActive = (history, path ) => {
    if (history.location.pathname === path) {
        return { color : "#ff9900"}
    } else {
        return { color: "#ffffff"}
    }
}

const Menu = ({history}) => (
    <div>
        <ul className="nav nav-tabs bg-primary">
            <li className="nav-item">
                <Link className="nav-link" style={isActive(history, '/')} to="/">Home</Link>
            </li>
            
            {!isAuthenticated() && (
                <Fragment>
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, '/signup')} to="/signup">Sign Up</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, '/signin')} to="/signin">Sign In</Link>
                    </li>
                </Fragment>
            )}
            
            {isAuthenticated() && (
                <Fragment>
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, '/user/dashboard')} to="/user/dashboard">Dashboard</Link>
                </li>
                <li className="nav-item">
                    <span className="nav-link" style={{cursor: 'pointer', color: '#ffff', padding:'10px 15px', display:'block'}} 
                    onClick={() => signOutApi(() => {
                        history.push("/")
                    })}>SignOUT</span>
                </li>
                </Fragment>
            )}
        </ul>
    </div>
)

export default withRouter(Menu);