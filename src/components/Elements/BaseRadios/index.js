import React from 'react';
import PropTypes from 'prop-types';
import { Radio } from 'antd';

class BaseRadioList extends React.Component {

    static propTypes = {
        options: PropTypes.array.isRequired,
        defaultValue: PropTypes.any,
        // name: PropTypes.string.isRequired,
        onChange: PropTypes.func,
        optionValue: PropTypes.string,
        optionLabel: PropTypes.string,
        vertical: PropTypes.bool
    }

    static defaultProps = {
        onChange: () => { },
        optionValue: 'value',
        optionLabel: 'label',
        vertical: false
    }

    render() {
        const { options, defaultValue, name, vertical, optionValue, optionLabel, onChange, ...rest } = this.props;

        const verticalRadioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };

        if (options.length) {
            return (
                <Radio.Group onChange={(e) => onChange(e.target.value)} defaultValue={defaultValue} {...rest}>
                    {
                        options.map((item, index) => {
                            return (
                                <Radio style={vertical ? verticalRadioStyle : {}} value={item[optionValue]} key={index}>
                                    {item[optionLabel]}
                                </Radio>
                            )
                        })
                    }
                </Radio.Group>
            )
        }
    }
}

export default BaseRadioList;


/**
* data: REQUIRED mang data de hien thi ra list radios [{label: "label", value: "value"}]
    * value: REQUIRED gia tri cua truong radio duoc chon String
    * name: REQUIRED ten cua truong radio String
* onChange handle radio onchang(event){}
    */