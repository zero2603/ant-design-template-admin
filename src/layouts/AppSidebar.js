import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Layout, Menu, Badge } from 'antd';
import {
    CustomerServiceOutlined,
    CloudServerOutlined,
    AppstoreOutlined,
    PlusCircleOutlined,
    PercentageOutlined,
    NotificationOutlined,
    ShareAltOutlined
} from '@ant-design/icons';
import menu from '../menu';
import MenuGroupItem from '../components/Menu/MenuGroupItem';
import MenuItem from '../components/Menu/MenuItem';

const { SubMenu } = Menu;
const { Sider } = Layout;

class AppSidebar extends Component {
    state = {
        collapsed: true
    }

    onCollapse = collapsed => {
        this.setState({ collapsed });
    };

    onClickMenu(item, key, keyPath) {
        this.props.history.push(key)
    }

    render() {
        var { pathname } = this.props.location;
        var { collapsed } = this.state;

        return (
            <Sider theme="light" width={250} className="site-layout-background" collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
                <Menu
                    mode="inline"
                    selectedKeys={[pathname]}
                    style={{ height: '100%', borderRight: 0 }}
                    onClick={({ item, key, keyPath }) => this.onClickMenu(item, key, keyPath)}
                >
                    {
                        menu.map((item, key) => {
                            if(item.children) {
                                return <MenuGroupItem item={item} key={key} />
                            } else {
                                return <MenuItem item={item} key={item.path} />
                            }
                        })
                    }
                </Menu>
            </Sider>
        )
    }
}

function mapStateToProps(state) {
    return {
        authUser: state.auth.authUser,
        config: state.config
    }
}

export default withRouter(connect(mapStateToProps)(AppSidebar));