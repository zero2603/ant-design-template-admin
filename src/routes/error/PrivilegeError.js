import React, { Component } from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

export default class PrivilegeError extends Component {
    render() {
        return (
            <div className="text-center mt-4">
                <Title>Lỗi 403</Title>
                <div>Bạn không có quyền truy cập trang này!</div>
            </div>
        )
    }
}
