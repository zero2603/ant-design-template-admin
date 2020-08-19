import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './home';
import UserPermission from './user/UserPermission';
import UserDetail from './user/UserDetail';
import UserList from './user/UserList';
import Profile from './auth/Profile';
import Config from './config/index';

const ProtectedRoute = ({ authUser, permission, component: Component, ...rest }) => (
    <Route
        {...rest}
        // render={(props) => (
        //     authUser ? <Component {...props} /> : <Redirect to='/login' />
        // )} 
        render={(props) => {
            if (authUser) {
                let availablePermissions = Object.keys(authUser.permissions);
                let isAccess = false;
                if (authUser.role_code == 'ADMIN') isAccess = true;
                else {
                    if (!permission || availablePermissions.indexOf(permission) >= 0) isAccess = true;
                }

                if (isAccess) return <Component {...props} />;
                else return <Redirect to='/error/403' />;
            } else {
                return <Redirect to='/login' />;
            }
        }}
    />
)

const routes = [
    {
        path: '/',
        component: Home,
        permission: null
    },
    {
        path: '/profile',
        component: Profile,
        permission: null
    },
    // module quan tri
    {
        path: '/users',
        component: UserList,
        permission: 'users'
    },
    {
        path: '/users/:id',
        component: UserDetail,
        permission: 'users'
    },
    {
        path: '/permissions',
        component: UserPermission,
        permission: 'permissions'
    },
    // config
    {
        path: '/config',
        component: Config,
        permission: null
    }
];



class Routes extends Component {
    render() {
        var { authUser } = this.props;

        return (
            <Switch>
                {
                    routes.map((route, index) => {
                        return (
                            <ProtectedRoute exact authUser={authUser} permission={route.permission} path={route.path} component={route.component} key={index} />
                        )
                    })
                }
            </Switch>
        )
    }
}

function mapStateToProps(state) {
    return {
        authUser: state.auth.authUser
    }
}

export default connect(mapStateToProps, null)(Routes);

