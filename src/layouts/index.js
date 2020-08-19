import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Menu, Breadcrumb } from 'antd';
import { isMobile, MobileView } from 'react-device-detect';
import AppHeader from './AppHeader';
import AppSidebar from './AppSidebar';
import AppFooter from './AppFooter';
// actions
import {getAllNotifications} from '../redux/actions/NotificationActions';


var { Content } = Layout;

class AppLayout extends Component {
    componentDidMount() {
        // this.props.getAllNotifications()
    }

    render() {

        return (
            <Layout>
                <AppHeader />
                <Layout>
                    {
                        isMobile ? null : <AppSidebar />
                    }
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Content className="content-wrapper">
                            {this.props.children}
                        </Content>
                        {/* <AppFooter /> */}
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}

function mapStateToProps(state) {
    return {
        notifications: state.notification.notifications
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllNotifications: (filter) => dispatch(getAllNotifications(filter))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppLayout);