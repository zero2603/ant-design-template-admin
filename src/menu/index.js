import React, { Component } from 'react';
import {
    ApartmentOutlined,
    AppstoreOutlined,
    UserOutlined,
    CloudServerOutlined,
    CustomerServiceOutlined,
    DollarOutlined,
    LaptopOutlined,
    ShopOutlined,
    CalendarOutlined,
    SettingOutlined,
    MailOutlined,
    PhoneOutlined
} from '@ant-design/icons';

const menu = [
    {
        path: '/',
        name: 'Trang chủ',
        icon: <AppstoreOutlined />,
        permission: null,
        children: null
    },
    {
        path: '#',
        name: 'Quản trị',
        icon: <ApartmentOutlined />,
        permission: null,
        children: [
            {
                path: '/statistic',
                name: 'Thống kê',
                permission: null
            },
            {
                path: '/users',
                name: 'Quản lý users',
                permission: 'user'
            },
            {
                path: '/permissions',
                name: 'Phân quyền',
                permission: 'permissions'
            }
        ],
        isAdminOnly: true
    },
    {
        path: '#',
        name: 'Cài đặt',
        icon: <SettingOutlined />,
        permission: null,
        isAdminOnly: true,
        children: [
            {
                path: '/config',
                name: 'Cài đặt chung',
                permission: null
            }
        ]
    }
];

export default menu;