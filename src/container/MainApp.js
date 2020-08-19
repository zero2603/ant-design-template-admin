import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AppLayout from '../layouts';
import Routes from '../routes';
import Login from '../routes/auth/Login';
import ResetPassword from '../routes/auth/ResetPassword';
import PrivilegeError from '../routes/error/PrivilegeError';
import { Spin } from 'antd';
import Helmet from 'react-helmet';
// App locale
import AppLocale from '../lang';
import { IntlProvider } from 'react-intl';
// actions
import { getAuthUser } from '../redux/actions/AuthActions';
import { getConfig } from '../redux/actions/ConfigActions';

class MainApp extends Component {
    state = {
        isLoading: true
    }

    async componentDidMount() {
        await this.props.getConfig();
        this.props.getAuthUser().then(() => {
            this.setState({ isLoading: false })
        }).catch(() => {
            this.setState({ isLoading: false })
        })

    }

    render() {
        var { isLoading } = this.state;
        var { pathname } = this.props.location;
        var { authUser } = this.props;

        const currentAppLocale = AppLocale['en'];

        if (isLoading) {
            return (
                <div className="mt-4 text-center">
                    <Spin size="large" />
                </div>
            )
        }

        var title = authUser ? `${authUser.role_name} - Hệ thống quản lý Gdata` : 'Hệ thống quản lý Gdata';

        switch (pathname) {
            case '/login': {
                return (
                    <Login />
                );
            }
            case '/reset-password': {
                return (
                    <ResetPassword />
                );
            }
            case '/error/403': {
                return (
                    <PrivilegeError />
                );
            }
            default: {
                return (
                    <IntlProvider
                        locale={'en'}
                        messages={currentAppLocale.messages}
                    >
                        <AppLayout>
                            <Helmet>
                                <title>{title}</title>
                            </Helmet>
                            <Routes />
                        </AppLayout>
                    </IntlProvider>
                )
            }
        }

    }
}

function mapStateToProps(state) {
    return {
        authUser: state.auth.authUser,
        config: state.config
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAuthUser: () => dispatch(getAuthUser()),
        getConfig: () => dispatch(getConfig())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainApp));