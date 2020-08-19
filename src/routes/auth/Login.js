import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Form, Button, Input, Checkbox, Card, Row, Col } from 'antd';
// actions
import { login } from '../../redux/actions/AuthActions';

class Login extends Component {
    onFinish = values => {
        console.log('Success:', values);
        this.props.login(values)
    };

    onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    render() {
        var { authUser } = this.props;

        if (authUser) return <Redirect to='/' />;

        return (
            <Row justify='center'>
                {/* <Col lg={6} md={24}> */}
                    <Card className="login-card">
                        <div className="text-center">
                            <img src={require('../../assets/img/logo.png')} className="login-logo" />
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
                                name="user_name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng điền username!',
                                    },
                                ]}
                            >
                                <Input placeholder="Username" />
                            </Form.Item>

                            <Form.Item
                                name="user_password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng điền mật khẩu!',
                                    },
                                ]}
                            >
                                <Input.Password placeholder="Mật khẩu"  />
                            </Form.Item>

                            <Row justify="space-between">
                                <Form.Item name="remember" valuePropName="checked">
                                    <Checkbox>Nhớ mật khẩu</Checkbox>
                                </Form.Item>
                                <Link to='/reset-password'>Quên mật khẩu?</Link>
                            </Row>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="w-100">
                                    Đăng nhập
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                {/* </Col> */}
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
        login: (data) => dispatch(login(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);