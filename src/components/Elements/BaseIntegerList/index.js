import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
const { Option } = Select;
import IntlMessages from '../../components/IntlMessage';

export default class BaseIntegerList extends Component {
    static propTypes = {
        selectedValue: PropTypes.number,
        min: PropTypes.number,
        max: PropTypes.number.isRequired,
        step: PropTypes.number,
        attr: PropTypes.object
    };

    static defaultProps = {
        min: 0,
        step: 1,
        attr: {}
    };

    render() {
        var {
            min,
            max,
            step,
            selected,
            defaultText,
            onChange,
            ...rest
        } = this.props;

        var options = [];
        for (let i = min; i <= max; i += step) {
            options.push({ value: i, label: i });
        }

        let value = selected ? selected : null;

        let temp = options.find(option => option.value == selected);
        if (!temp) value = null;

        if(!defaultText) {
            value = options[0].value;
        }

        return (
            <Select
                defaultValue={value}
                onChange={(value) => onChange(value)}
                {...rest}
            >
                {
                    defaultText ? (
                        <Option value={null}>{defaultText}</Option>
                    ) : null
                }
                {
                    options.map((option, index) => {
                        return (
                            <Option key={index} value={option.value}>{option.label}</Option>
                        );
                    })
                }
            </Select>
        )
    }
}