import React, { Component } from 'react';
import { Menu } from 'antd';
import { connect } from 'react-redux';

const { SubMenu } = Menu;

class MenuGroupItem extends Component {
    render() {
        var { item, authUser, config, ...restProps } = this.props;

        if(item.isAdminOnly && authUser.role_code != 'ADMIN') return null;

        var availablePermissions = Object.keys(authUser.permissions);
        var displayedMenuItems = item.children.filter(child => {
            if (child.permission) {
                if (availablePermissions.indexOf(child.permission) >= 0) return child;
            } else {
                return child;
            }
        });

        if (displayedMenuItems.length) {
            return (
                <SubMenu title={item.name} key={item.path} icon={item.icon} {...restProps}>
                    {
                        displayedMenuItems.map(element => {
                            return (
                                <Menu.Item key={element.path}>{element.name}</Menu.Item>
                            )
                        })
                    }
                </SubMenu>
            )
        } else {
            return null;
        }
    }
}

function mapStateToProps(state) {
    return {
        authUser: state.auth.authUser,
        config: state.config
    }
}

export default connect(mapStateToProps, null)(MenuGroupItem);