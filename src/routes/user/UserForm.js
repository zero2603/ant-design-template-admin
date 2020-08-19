import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Modal, Button, Input, InputNumber } from 'antd';
import BaseSelect from '../../components/Elements/BaseSelect';
import BaseRadios from '../../components/Elements/BaseRadios';
import generatePassword from 'generate-password';
// actions
import { createUser, updateUser } from '../../redux/actions/UserActions';

class UserForm extends Component {
    state = {
        loading: false,
        userRole: null
    }

    onChangeRole(value) {
        this.setState({ userRole: value })
    }

    async submit(e) {
        e.preventDefault();

        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                this.setState({ loading: true });
                try {
                    if (this.props.user) {
                        await this.props.updateUser(this.props.user.user_id, values);
                        this.setState({ loading: false });
                        this.props.onCancel();
                    } else {
                        await this.props.createUser(values);
                        this.setState({ loading: false });
                        this.props.onCancel();
                    }
                } catch (error) {
                    this.setState({ loading: false });
                }
            }
        });
    }

    render() {
        var { visible, user, config } = this.props;
        var { loading, userRole } = this.state;

        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };

        const statuses = [
            { value: 1, label: 'Active' },
            { value: 0, label: 'Inactive' },
        ];

        const majors = [
            { value: 0, label: 'Tất cả' },
            { value: 1, label: 'Phần cứng' },
        ];

        var currentUserRole = user ? user.role_code : null;

        return (
            <div>
                <Modal
                    visible={visible}
                    title={user ? "Sửa thông tin user" : "Thêm mới user"}
                    onOk={(e) => this.submit(e)}
                    onCancel={() => this.props.onCancel()}
                    footer={[
                        <Button key="back" onClick={() => this.props.onCancel()}>
                            Huỷ
                    </Button>,
                        <Button key="submit" type="primary" onClick={(e) => this.submit(e)} loading={loading}>
                            Submit
                    </Button>,
                    ]}
                >
                    {visible ?
                        <Form {...formItemLayout}>
                            <Form.Item label="Username">
                                {getFieldDecorator('user_name', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Vui lòng điền username!',
                                        },
                                    ],
                                    initialValue: user ? user.user_name : ""
                                })(<Input />)}
                            </Form.Item>
                            <Form.Item label="E-mail">
                                {getFieldDecorator('user_email', {
                                    rules: [
                                        {
                                            type: 'email',
                                            message: 'Email không hợp lệ!',
                                        },
                                        {
                                            required: true,
                                            message: 'Vui lòng điền E-mail!',
                                        },
                                    ],
                                    initialValue: user ? user.user_email : ""
                                })(<Input />)}
                            </Form.Item>
                            {/* Only show password input when create user */}
                            {
                                user ? null : (
                                    <Form.Item label="Mật khẩu" hasFeedback>
                                        {getFieldDecorator('user_password', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'Vui lòng điền mật khẩu!',
                                                },
                                                {
                                                    validator: this.validateToNextPassword,
                                                },
                                            ],
                                            initialValue: generatePassword.generate({
                                                length: 10,
                                                numbers: true
                                            })
                                        })(<Input.Password autoComplete={"new-password"} />)}
                                    </Form.Item>
                                )
                            }
                            <Form.Item label="Vai trò user">
                                {getFieldDecorator('role', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Vui lòng chọn vai trò!',
                                        },
                                    ],
                                    initialValue: user ? user.role : 1
                                })(
                                    <BaseSelect
                                        options={config.roles}
                                        optionValue="id"
                                        optionLabel="name"
                                        onChange={(value) => this.onChangeRole(value)}
                                    />
                                )}
                            </Form.Item>
                            <Form.Item label="Trạng thái">
                                {getFieldDecorator('user_active', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Vui lòng chọn trạng thái!',
                                        },
                                    ],
                                    initialValue: user ? user.user_active : 1
                                })(
                                    <BaseRadios options={statuses} />
                                )}
                            </Form.Item>
                            {
                                currentUserRole == "KD" || userRole == 2 ? (
                                    <Form.Item label="Doanh số">
                                        {getFieldDecorator('doanhso', {
                                            rules: [
                                                {
                                                    required: false,
                                                },
                                            ],
                                            initialValue: user ? user.doanhso : 0
                                        })(
                                            <InputNumber
                                                style={{ width: '100%' }}
                                            />
                                        )}
                                    </Form.Item>
                                ) : null
                            }
                            {
                                currentUserRole == "KTH" || userRole == 3 ? (
                                    <Form.Item label="Chuyên môn">
                                        {getFieldDecorator('type_nvkt', {
                                            rules: [
                                                {
                                                    required: false,
                                                },
                                            ],
                                            initialValue: user ? user.type_nvkt : 0
                                        })(
                                            <BaseRadios options={majors} />
                                        )}
                                    </Form.Item>
                                ) : null
                            }

                        </Form>
                        : null}
                </Modal>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        config: state.config
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createUser: (data) => dispatch(createUser(data)),
        updateUser: (id, data) => dispatch(updateUser(id, data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create({ name: 'user_form' })(UserForm));