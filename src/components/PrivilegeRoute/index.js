import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivilegeRoute = (props) => {
    if(props.canAccess) {
        return <Route {...props} />
    } else {
        return <Redirect to="/error/403" />
    }
}

export default PrivilegeRoute;