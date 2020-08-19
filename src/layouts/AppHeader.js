import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Layout, Modal, Drawer, Button, Avatar, Row, Col, Popover, Menu, List, Tag, Divider } from 'antd';
import {
    MenuFoldOutlined,
    SmileOutlined,
    UnlockOutlined,
    LogoutOutlined,
    ExclamationCircleOutlined,
    InfoCircleOutlined
} from '@ant-design/icons';
import { isMobile, MobileView, isBrowser } from 'react-device-detect';
// actions
import { logout } from '../redux/actions/AuthActions';
import AppDrawer from './AppDrawer';

const { Header } = Layout;
const { confirm } = Modal;

class AppHeader extends Component {

    state = {
        visible: false
    }

    toggleDrawer(visible) {
        this.setState({ visible })
    }

    onLogout() {
        confirm({
            title: 'Xác nhận đăng xuất',
            icon: <ExclamationCircleOutlined />,
            content: 'Bạn chắc chắn muốn đăng xuất chứ?',
            okText: 'OK',
            cancelText: 'Huỷ',
            onOk: () => {
                this.props.logout().then(() => {
                    window.location.href = '/admin/login'
                })
            }
        })
    }

    render() {
        var { visible } = this.state;
        var { authUser } = this.props;

        return (
            <Header id="custom-header" >
                <Row justify="space-between">
                    <Col>
                        <div className="logo">
                            <Link to="/">
                                <img src={require('../assets/img/logo.png')} />
                            </Link>
                        </div>
                    </Col>
                    <Col>
                        {
                            isMobile ? (
                                <Button
                                    type="link"
                                    icon={<MenuFoldOutlined className="header-icons" />}
                                    onClick={() => this.toggleDrawer(true)}
                                />
                            ) : (
                                    <Popover
                                        className="header-actions"
                                        placement="bottomRight"
                                        content={
                                            <div>
                                                <Link to='/profile'>
                                                    <Button type="link" className="p-0 align-items-center">
                                                        <InfoCircleOutlined /> Thông tin tài khoản
                                                    </Button>
                                                </Link>
                                                <Divider style={{ marginTop: '10px', marginBottom: '10px' }} />
                                                <Button type="link" className="p-0 align-items-center" onClick={() => this.onLogout()}>
                                                    <LogoutOutlined /> Đăng xuất
                                                </Button>
                                            </div>
                                        }
                                        title={null}
                                    >
                                        <Button type="link" icon={<SmileOutlined className="header-icons" />} />
                                        <span className="text-white">{authUser ? authUser.user_name : null}</span>
                                    </Popover>
                                )
                        }
                    </Col>
                </Row>
                <AppDrawer visible={visible} onClose={() => this.toggleDrawer(false)} />
            </Header>
        )
    }
}

function mapStateToProps(state) {
    return {
        authUser: state.auth.authUser
    }
}

function mapDispatchToProps(dispatch) {
    return {
        logout: () => dispatch(logout())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppHeader));