import React, { Component } from 'react';
import { Menu } from 'antd';
import { connect } from 'react-redux';

class MenuItem extends Component {
    render() {
        var { item, key, authUser, ...restProps } = this.props;

        var availablePermissions = Object.keys(authUser.permissions);

        let isRender = false;
        
        if(availablePermissions.indexOf(item.permission) >= 0 || !item.permission) isRender = true;
        if(authUser.role_code == 'ADMIN') isRender = true;
        else {
            if (item.isAdminOnly) isRender = false;
        }

        if(isRender) {
            return (
                <Menu.Item {...restProps} key={item.path} icon={item.icon}>{item.name}</Menu.Item>
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

export default connect(mapStateToProps)(MenuItem);