import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Form, Button, Input, Result, Card, Row, Col, Typography } from 'antd';
// actions
import { resetPassword } from '../../redux/actions/AuthActions';

class ResetPassword extends Component {
    state = {
        isSuccess: false,
        loading: false
    }

    onFinish = values => {
        this.setState({ loading: true })
        this.props.resetPassword(values).then(() => {
            this.setState({ isSuccess: true, loading: false })
        }).catch(err => {
            this.setState({ loading: false })
        })
    };

    onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    render() {
        var { isSuccess, loading } = this.state;
        var { authUser } = this.props;

        if (authUser) return <Redirect to='/' />

        return (
            <Row>
                <Col lg={9} md={0}></Col>
                <Col lg={6} md={24}>
                    {
                        isSuccess ? (
                            <Result
                                status="success"
                                title="Mật khẩu mới đã được gửi vào hộp thư email của bạn!"
                                subTitle="Vui lòng kiểm tra email của bạn để lấy mật khẩu và đăng nhập lại vào hệ thống Gdata"
                                extra={[
                                    <Link to='/login'>
                                        <Button type="primary" key="console">
                                            Trở về màn hình đăng nhập
                                        </Button>
                                    </Link>
                                ]}
                            />
                        ) : (
                                <Card className="mt-4 w-100">
                                    <div className="text-center">
                                        <Typography.Title level={4}>Khôi phục mật khẩu</Typography.Title>
                                        <img src={require('../../assets/img/forgot-password.png')} />
                                    </div>
                                    <Form
                                        className="mt-4"
                                        layout="vertical"
                                        initialValues={{
                                            remember: true,
                                        }}
                                        onFinish={this.onFinish}
                                        onFinishFailed={this.onFinishFailed}
                                    >
                                        <Form.Item
                                            label="Email khôi phục"
                                            name="email"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Vui lòng điền email!',
                                                },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>

                                        <Form.Item>
                                            <Button type="primary" htmlType="submit" className="w-100" loading={loading}>
                                                Khôi phục mật khẩu
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </Card>
                            )
                    }
                </Col>
                <Col lg={9} md={0}></Col>
            </Row>
        )
    }
}

function mapStateToProps(state) {
    return {
        authUser: state.auth.authUser
    }
}

function mapDispatchToProps(dispatch) {
    return {
        resetPassword: (data) => dispatch(resetPassword(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);