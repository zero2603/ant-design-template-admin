import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Card, Form, Input, Button, Row, Col, Typography, Descriptions, Alert, Tag } from 'antd';
import { isMobile } from 'react-device-detect';
import NumberFormat from 'react-number-format';
import PageTitle from '../../components/PageTitle';
import BaseRadios from '../../components/Elements/BaseRadios';
// actions
import { changePassword, updateAuthUser } from '../../redux/actions/AuthActions';

const routes = [
    {
        path: '/',
        breadcrumbName: 'Trang chủ',
    },
    {
        path: '/profile',
        breadcrumbName: 'Thông tin tài khoản',
    },
]

class Profile extends Component {
    state = {
        loading: false
    }

    formRef = React.createRef();

    handleSubmit = (values) => {
        this.setState({ loading: true });

        this.props.changePassword(values).then(() => {
            this.formRef.current.resetFields();
            this.setState({ loading: false })
        }).catch(() => {
            this.setState({ loading: false })
        })
    }

    onUpdateSMTP = (values) => {
        this.props.updateAuthUser({smtp_email_password: values.password});
    }

    render() {
        var { loading } = this.state;
        var { authUser, config } = this.props;

        return (
            <div>
                <PageTitle routes={routes} title="Thông tin tài khoản" />
                <Row gutter={24}>
                    <Col lg={12} sm={24}>
                        <Card hoverable className="mb-4">
                            {
                                isMobile ? (
                                    <Descriptions layout="vertical" size="small" column={1}>
                                        <Descriptions.Item label="" >
                                            <h6>{authUser.user_name}</h6>
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Email">{authUser.user_email}</Descriptions.Item>
                                        <Descriptions.Item label="Vai trò"><Tag color="cyan">{authUser.role_name}</Tag></Descriptions.Item>
                                        {
                                            authUser.role_code == 'KD' ? (
                                                <Descriptions.Item label="Doanh số khoán">{authUser.doanhso}</Descriptions.Item>
                                            ) : null
                                        }
                                    </Descriptions>
                                ) : (
                                        <Descriptions size="small" column={2}>
                                            <Descriptions.Item label="" span={2}>
                                                <h6>{authUser.user_name}</h6>
                                            </Descriptions.Item>
                                            <Descriptions.Item label="Email">{authUser.user_email}</Descriptions.Item>
                                            <Descriptions.Item label="Vai trò"><Tag color="cyan">{authUser.role_name}</Tag></Descriptions.Item>
                                            {
                                                authUser.role_code == 'KD' ? (
                                                    <Descriptions.Item label="Doanh số khoán">{authUser.doanhso}</Descriptions.Item>
                                                ) : null
                                            }
                                        </Descriptions>
                                    )
                            }

                        </Card>
                        <Card className="mb-4">
                            <Typography.Title level={4}>Đổi mật khẩu</Typography.Title>
                            <Form
                                layout="vertical"
                                onFinish={this.handleSubmit}
                                ref={this.formRef}
                            >

                                <Form.Item
                                    label="Mật khẩu hiện tại của bạn"
                                    name="old_password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng điền mật khẩu hiện tại của bạn!'
                                        }
                                    ]}
                                >
                                    <Input.Password />
                                </Form.Item>
                                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                    <Col md={12} sm={24} className="custom-col">
                                        <Form.Item
                                            label="Mật khẩu mới"
                                            name="new_password"
                                            rules={[
                                                { required: true, message: 'Vui lòng điền mật khẩu mới!' }
                                            ]}
                                        >
                                            <Input.Password />
                                        </Form.Item>
                                    </Col>
                                    <Col md={12} sm={24} className="custom-col">
                                        <Form.Item
                                            label="Xác nhận mật khẩu mới"
                                            name="confirm_new_password"
                                            rules={[
                                                { required: true, message: 'Vui lòng điền lại mật khẩu mới!' }
                                            ]}
                                        >
                                            <Input.Password />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Form.Item>
                                    <Button type="primary" htmlType="submit" loading={loading}>
                                        Xác nhận
                                </Button>
                                </Form.Item>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        authUser: state.auth.authUser,
        config: state.config,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        changePassword: (data) => dispatch(changePassword(data)),
        updateAuthUser: (data) => dispatch(updateAuthUser(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);