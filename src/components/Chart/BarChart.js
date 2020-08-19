import React, { Component } from 'react';
import { Column } from '@ant-design/charts';
import NumberFormat from 'react-number-format';
import { formatNumber } from '../../utils/helpers';

export default class BarChart extends Component {
    render() {
        var { data, labelField, valueField } = this.props;

        const chartConfig = {
            visible: true,
            forceFit: true,
            data: data,
            padding: 'auto',
            xField: labelField,
            yField: valueField,
            meta: {
                [labelField]: {
                    alias: labelField,
                },
                [valueField]: {
                    alias: valueField,
                },
            },
            label: {
                visible: true,
                style: {
                    fill: '#0D0E68',
                    fontSize: 12,
                    fontWeight: 600,
                    opacity: 0.6,
                },
            }
    };

    return(
            <Column { ...chartConfig } />
        )
    }
}
