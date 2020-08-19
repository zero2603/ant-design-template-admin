import React, { Component } from 'react'
import { Card } from 'antd';

export default class CardWithIcon extends Component {
    render() {
        var { className, title, icon, ...rest } = this.props;

        return (
            <Card className={`module-cards`} {...rest}>
                <div className="text-center">
                    {icon}
                    <div className="text-uppercase mt-2">{title}</div>
                </div>
            </Card>
        )
    }
}
