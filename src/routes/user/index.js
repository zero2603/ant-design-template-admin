import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import UserList from './UserList';
import UserPermission from './UserPermission';
import UserRole from './UserRole';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import UserDetail from './UserDetail';

class User extends Component {
    render() {
        const {match, user} = this.props;

        if(user.role_code != "ADMIN") {
            return (
                <Redirect to="/error/403"/>
            )
        }

        return (
            <div>
                <Switch>
                    <Route exact from={`${match.url}/`} component={UserList} />
                    <Route exact from={`${match.url}/permissions`} component={UserPermission} />
                    <Route exact from={`${match.url}/:id`} component={UserDetail} />
                </Switch>
        
            </div>
        );
    }
} 

function mapStateToProps(state) {
    return {
        user: state.auth.authUser
    }
}

export default connect(mapStateToProps, null)(User);