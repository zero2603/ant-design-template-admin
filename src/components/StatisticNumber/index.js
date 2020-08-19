import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Typography, Statistic } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

export default class StatisticNumber extends Component {
    static defaultProps = {
        showPrefix: true
    };

    render() {
        var { title, value, unit, showPrefix } = this.props;

        return (
            <Statistic
                title={<Typography.Text strong>{title}</Typography.Text>}
                value={value || 0}
                precision={0}
                valueStyle={{ color: value >= 0 ? '#3f8600' : '#e74c3c' }}
                prefix={showPrefix ? (<span>{value >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}</span>) : null}
                suffix={unit}
            />
        )
    }
}
