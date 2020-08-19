import React, { Component } from 'react';
import { Card, Typography, Row } from 'antd';
import {RightCircleFilled} from '@ant-design/icons'

export default class ModuleCard extends Component {
    render() {
        var { className, title, icon, ...rest } = this.props;

        return (
                <Card className={`module-cards mt-4 ${className}`} {...rest}>
                    <div className=""> 
                        <Row justify="space-between">
                            {icon}
                            <RightCircleFilled className="view-more-icon" />
                        </Row>
                        <div className="mt-4">
                            <Typography.Title level={4}>{title}</Typography.Title>
                        </div>
                        
                    </div>
                </Card>
        )
    }
}
