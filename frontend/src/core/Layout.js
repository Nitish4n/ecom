import React from 'react';
import Menu from './Menu';

const Layout = ({title="Title 1", description, className="display-4", children}) => {
    return (
     <div>
        <Menu />
        <div className="jumbotron jumbotron-fluid">
            <h1 className={className}>{title}</h1>
            <p className="lead">{description}</p>
            <hr className="my-4" />
        </div>
        {children}
     </div>   
    )
}

export default Layout;
