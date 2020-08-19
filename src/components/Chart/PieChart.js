import React, { Component } from 'react';
import { Pie } from '@ant-design/charts';
import NumberFormat from 'react-number-format';
import { formatNumber } from '../../utils/helpers';

export default class PieChart extends Component {
    render() {
        var { data, labelField, valueField } = this.props;

        let total = 0;
        data.forEach(dataItem => {
            total += parseFloat(dataItem[valueField]);
        })

        const chartConfig = {
            forceFit: true,
            radius: 0.8,
            data: data,
            angleField: valueField,
            colorField: labelField,
            label: {
                visible: true,
                type: 'outer-center',
                formatter: (text, item) => `${item._origin[labelField]} (${((item._origin[valueField] * 100) / total).toFixed(2)}%)\n${formatNumber(item._origin[valueField])}`,
                style: {
                    fontWeight: 'bold',
                    fontSize: 14,
                    lineHeight: 18
                }
            },
            legend: {
                visible: false,
                position: 'top',
                flipPage: true
            }
        };

        return (
            <Pie {...chartConfig} />
        )
    }
}
