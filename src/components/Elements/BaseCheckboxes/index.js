import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Row, Col } from 'antd';
import IntlMessages from '../../IntlMessage';

class BaseCheckBoxList extends React.Component {

    static propTypes = {
        options: PropTypes.array.isRequired,
        defaultValue: PropTypes.array,
        name: PropTypes.string,
        onChange: PropTypes.func,
        intl: PropTypes.bool
    }

    static defaultProps = {
        data: [],
        onChange: () => { },
        name: "name",
        defaultValue: [],
        vertical: false,
        optionValue: "value",
        optionLabel: "label",
        intl: false
    }

    onChange = (checkedValues) => {
        this.props.onChange(checkedValues);
    }

    render() {
        const { options, vertical, defaultValue, name, onChange, optionLabel, optionValue, intl, ...rest } = this.props;
        var handledOptions = options.map(item => { return { label: item[optionLabel], value: item[optionValue] } });

        if (handledOptions.length) {
            return (
                <React.Fragment>
                    {
                        vertical ? (
                            <Checkbox.Group style={{ width: '100%' }} name={name} defaultValue={defaultValue} onChange={this.onChange} {...rest} >
                                <Row>
                                    {handledOptions.map((item, index) => {
                                        return <Col span={24} key={index}>
                                            <Checkbox value={item.value}>
                                                {intl ? <IntlMessages id={item.label} /> : item.label}
                                            </Checkbox>
                                        </Col>
                                    })}
                                </Row>
                            </Checkbox.Group>
                        ) : (
                            <Checkbox.Group name={name} options={handledOptions} defaultValue={defaultValue} onChange={this.onChange} {...rest} />
                        )
                    }
                </React.Fragment>
            )
        }
        else return <p style={{ color: "red" }}><strong>{this.props.textNoData ? this.props.textNoData : "Input Checkbox has no data"}</strong></p>
    }
}

export default BaseCheckBoxList;


/**
 * <BaseCheckBoxList data=[{}] name="" value=[] onChange > </BaseCheckBoxList>
 * props:
 *  data: REQUIRED mang data de hien thi ra list cac checkbox [{title: "label", id: "value"}]
 *  value: REQUIRED ["value1", "value2"] mang gia tri ban dau
 *  onChange: onChange(name, value) REQUIRED name: ten truong co checkbox, value: mang gia tri
 *  name: ten truong co checkbox
 */