import React, { Component } from 'react';
import PageTitle from '../../components/PageTitle';
import { Tag, Spin, Switch, Input, Button, Tooltip, Divider, InputNumber, Card, Form, Tabs, Row, Col } from 'antd';
import { connect } from 'react-redux';
import { ReactMultiEmail, isEmail } from 'react-multi-email';
import { Redirect } from 'react-router-dom';
import BaseRadioList from '../../components/Elements/BaseRadios';
import BaseSelect from '../../components/Elements/BaseSelect';
import {
    SlidersOutlined,
    MailOutlined,
    CreditCardOutlined
} from '@ant-design/icons';
// actions
import { setConfig } from '../../redux/actions/ConfigActions';
import { NotificationManager } from 'react-notifications';
import ReactQuill from 'react-quill';

const routes = [
    {
        path: '/',
        breadcrumbName: 'Trang chủ',
    },
    {
        path: '/config',
        breadcrumbName: 'Cài đặt trong hệ thống',
    },
]

class Config extends Component {
    formRef = React.createRef();

    state = {
        config: {
            roles: []
        },
        loading: false
    }

    async submit(values) {
        var updatedValues = { ...this.props.config, ...values };
        delete updatedValues.roles;
        delete updatedValues.nvkd;
        delete updatedValues.nvkt;
        delete updatedValues.users;
        delete updatedValues.productCategories;
        delete updatedValues.serviceCategories;
        delete updatedValues.datacenter_partners;
        delete updatedValues.mail_templates;

        this.setState({ loading: true });
        await this.props.setConfig(updatedValues);
        this.setState({ loading: false });
    }

    render() {
        var { loading } = this.state;
        var { user, config } = this.props;

        if (user.role_code != "ADMIN") {
            return (
                <Redirect to="/error/403" />
            )
        }

        const formItemLayout = {
            labelAlign: 'left',
            labelCol: {
                md: { span: 24 },
                lg: { span: 8 },
            },
            wrapperCol: {
                md: { span: 24 },
                lg: { span: 16 },
            },
        };

        return (
            <div>
                <PageTitle routes={routes} title="Cài đặt" />
                <Card>
                    <Form
                        {...formItemLayout}
                        onFinish={(values) => this.submit(values)}
                        onFinishFailed={(e) => { NotificationManager.error('Vui lòng điền đầy đủ các trường bắt buộc ở tất cả các tab') }}
                        initialValues={{
                            ...config,
                            renewal_remind_days: config.renewal_remind_days ? config.renewal_remind_days : 5,
                            slow_response_limit: config.slow_response_limit ? config.slow_response_limit : 15,
                            view_customer_times: config.view_customer_times ? config.view_customer_times : 10,
                            technical_percent: config.technical_percent ? config.technical_percent : 15,
                            mail_smtp_secure: config.mail_smtp_secure ? config.mail_smtp_secure : 'ssl',
                            company_payment_account: config.company_payment_account || '',
                            personal_payment_account: config.personal_payment_account || ''
                        }}
                        ref={this.formRef}
                    >
                        <Tabs>
                            <Tabs.TabPane key="general" tab={<span><SlidersOutlined style={{ fontSize: '18px' }} />Cài đặt chung</span>}>
                                <Form.Item label="Vai trò trong hệ thống">
                                    {
                                        config.roles.map((role, index) => {
                                            return (
                                                <Tag key={index} color="blue">{role.name}</Tag>
                                            )
                                        })
                                    }
                                </Form.Item>
                                <Form.Item
                                    label="Thời gian đánh dấu hỗ trợ chậm"
                                    name='slow_response_limit'
                                    rules={[{
                                        required: true,
                                        type: 'number',
                                        min: 1,
                                        message: 'Vui lòng điền một giá trị số!',
                                    }]}
                                    getValueFromEvent={(e) => {
                                        const convertedValue = Number(e.currentTarget.value);
                                        if (isNaN(convertedValue)) {
                                            return Number(this.formRef.current.getFieldValue("slow_response_limit"));
                                        } else {
                                            return convertedValue;
                                        }
                                    }}
                                >
                                    <Input addonAfter={<div>phút</div>} />
                                </Form.Item>
                                <Form.Item
                                    label="Nhắc gia hạn trước bao nhiêu ngày"
                                    name="renewal_remind_days"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng điền một giá trị số!',
                                        },
                                    ]}
                                // getValueFromEvent={(e) => {
                                //     const convertedValue = Number(e.currentTarget.value);
                                //     if (isNaN(convertedValue)) {
                                //         return Number(this.formRef.current.getFieldValue("renewal_remind_days"));
                                //     } else {
                                //         return convertedValue;
                                //     }
                                // }}
                                >
                                    <InputNumber style={{ width: '100%' }} />
                                </Form.Item>
                                <Form.Item
                                    label={<Tooltip title="Danh sách email nhận khi có sự thay đổi trong hệ thống">Email nhận thông báo thay đổi</Tooltip>}
                                    name="admin_emails"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng điền ít nhất một email!',
                                        },
                                    ]}
                                >
                                    <ReactMultiEmail
                                        emails={config.admin_emails}
                                        getLabel={(email, index, removeEmail) => {
                                            return (
                                                <div data-tag key={index}>
                                                    {email}
                                                    <span data-tag-handle onClick={() => removeEmail(index)}>
                                                        ×
                                                    </span>
                                                </div>
                                            );
                                        }}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label="Email nhận lịch hẹn gặp khách hàng"
                                    name='appointment_email'
                                    rules={[
                                        {
                                            required: true,
                                            type: 'email',
                                            message: 'Vui lòng điền một email!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Email nhận thông báo thay đổi dịch vụ"
                                    name='changed_product_email'
                                    rules={[
                                        {
                                            required: true,
                                            type: 'email',
                                            message: 'Vui lòng điền một email!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Hiển thị sản phẩm đối tác cho KH"
                                    name="show_partner_products"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng chọn một lựa chọn!',
                                        },
                                    ]}
                                >
                                    <BaseRadioList
                                        options={[
                                            { label: 'Hiển thị', value: true },
                                            { label: 'Ẩn', value: false }
                                        ]}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label="Số lần mỗi user được xem thông tin khách hàng"
                                    name="view_customer_times"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng điền một số!',
                                        },
                                    ]}
                                >
                                    <InputNumber className="w-100" />
                                </Form.Item>
                                <Form.Item
                                    label="Tỉ lệ doanh thu dành cho bộ phận kỹ thuật"
                                    name="technical_percent"
                                    rules={[
                                        {
                                            required: true,
                                            type: 'number',
                                            min: 1,
                                            message: 'Vui lòng điền một giá trị số!',
                                        },
                                    ]}
                                    getValueFromEvent={(e) => {
                                        const convertedValue = Number(e.currentTarget.value);
                                        if (isNaN(convertedValue)) {
                                            return Number(this.formRef.current.getFieldValue("technical_percent"));
                                        } else {
                                            return convertedValue;
                                        }
                                    }}
                                >
                                    <Input addonAfter={<div>%</div>} />
                                </Form.Item>
                                <Form.Item
                                    label="Nhân viên tiếp nhận khách hàng & dịch vụ OpenStack"
                                    name="default_business_for_openstack"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng chọn một option!',
                                        },
                                    ]}
                                >
                                    <BaseSelect 
                                        options={config.users}
                                        optionValue="user_id"
                                        optionLabel="user_name"
                                        showSearch
                                    />
                                </Form.Item>
                            </Tabs.TabPane>
                            <Tabs.TabPane key="mail" tab={<span><MailOutlined style={{ fontSize: '18px' }} />Cài đặt Email hệ thống</span>}>
                                <Form.Item label="SMTP Host" name="mail_smtp_host" rules={[{ required: true, message: "Bắt buộc" }]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item label="Kiểu mã hoá (Encryption)" name="mail_smtp_secure" rules={[{ required: true, message: "Bắt buộc" }]}>
                                    <BaseRadioList
                                        options={[
                                            { label: 'SSL', value: 'ssl' },
                                            { label: 'TLS', value: 'tls' }
                                        ]}
                                    />
                                </Form.Item>
                                <Form.Item label="Xác thực (Authentication)" name="mail_smtp_authentication" rules={[{ required: true, message: "Bắt buộc" }]}>
                                    <BaseRadioList
                                        options={[
                                            { label: 'Có', value: true },
                                            { label: 'Không', value: false }
                                        ]}
                                    />
                                </Form.Item>
                                <Form.Item label="SMTP Port" name="mail_smtp_port" rules={[{ required: true, message: "Bắt buộc" }]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item label="Email support (dùng để gửi mail trong hệ thống)" name="support_email" rules={[{ required: true, message: "Bắt buộc" }]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item label="Mật khẩu email support" name="password_support_email" rules={[{ required: false, message: "Bắt buộc" }]}>
                                    <Input.Password autoComplete="new-password" />
                                </Form.Item>
                            </Tabs.TabPane>
                            <Tabs.TabPane key="payment" tab={<span><CreditCardOutlined style={{ fontSize: '18px' }} />Tài khoản thanh toán</span>}>
                                <Form.Item className="payment-config" label="Tài khoản công ty" name="company_payment_account" rules={[{ required: true, message: "Bắt buộc" }]}>
                                    <ReactQuill />
                                </Form.Item>
                                <Form.Item className="payment-config" label="Tài khoản cá nhân" name="personal_payment_account" rules={[{ required: true, message: "Bắt buộc" }]}>
                                    <ReactQuill />
                                </Form.Item>
                            </Tabs.TabPane>
                        </Tabs>

                        <div className="text-right">
                            <Button type="primary" htmlType="submit" loading={loading}>
                                Cập nhật
                            </Button>
                        </div>
                    </Form>
                </Card>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        config: state.config,
        user: state.auth.authUser
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setConfig: (data) => dispatch(setConfig(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Config);