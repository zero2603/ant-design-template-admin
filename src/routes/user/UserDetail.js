import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PageTitle from '../../components/PageTitle';
import { Modal, Button, Input, InputNumber, Row, Col, Form, Card, Spin, Typography, DatePicker, Table, Badge } from 'antd';
import BaseSelect from '../../components/Elements/BaseSelect';
import BaseRadios from '../../components/Elements/BaseRadios';
import NumberFormat from 'react-number-format';
import moment from 'moment';
import { CheckCircleTwoTone, CloseCircleTwoTone, WarningOutlined } from '@ant-design/icons';
import { checkPermission } from '../../utils/permission';
// actions
import { createUser, updateUser, getUser } from '../../redux/actions/UserActions';

const routes = [
    {
        path: '/',
        breadcrumbName: 'Trang chủ',
    },
    {
        path: '/users',
        breadcrumbName: 'Danh sách user',
    },
    {
        path: '#',
        breadcrumbName: 'Chi tiết',
    },
]

const UserDetailForm = ({ user, roles, statuses, majors, onSubmit }) => (
    <Card>
        <Form
            layout="vertical"
            onFinish={(values) => onSubmit(values)}
            onFinishFailed={(error) => console.log(error)}
            initialValues={user}
        >
            <Form.Item
                label="Username"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng điền username!',
                    },
                ]}
                name="user_name"
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="E-mail"
                rules={[
                    {
                        type: 'email',
                        message: 'Email không hợp lệ!',
                    },
                    {
                        required: true,
                        message: 'Vui lòng điền E-mail!',
                    },
                ]}
                name="user_email"
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Vai trò user"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng chọn vai trò!',
                    },
                ]}
                name="role"
            >
                <BaseSelect
                    options={roles}
                    optionValue="id"
                    optionLabel="name"
                />
            </Form.Item>
            <Form.Item
                label="Trạng thái"
                name="user_active"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng chọn trạng thái!',
                    },
                ]}
            >
                <BaseRadios options={statuses} />
            </Form.Item>
            {
                user.role_code == "KD" ? (
                    <Form.Item label="Doanh số khoán hàng tháng" name="doanhso">
                        <InputNumber
                            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            style={{ width: '100%' }}
                            step={100000}
                        />
                    </Form.Item>
                ) : null
            }
            {
                user.role_code == "KTH" ? (
                    <Form.Item label="Chuyên môn kỹ thuật" name="type_nvkt">
                        <BaseRadios options={majors} />
                    </Form.Item>
                ) : null
            }
            {
                checkPermission('user', 'update') ? (
                    <Form.Item>
                        <Button htmlType="submit" type="primary">Cập nhật</Button>
                    </Form.Item>
                ) : null
            }

        </Form>
    </Card>
)

class UserDetail extends Component {
    state = {
        isLoading: true,
        query: {
            month: moment().format('M'),
            year: moment().format('Y'),
        }
    }

    async componentDidMount() {
        await this.props.getUser(this.props.match.params.id);
        this.setState({ isLoading: false })
    }

    onUpdate = (values) => {
        this.props.updateUser(this.props.match.params.id, values);
    }

    async onChangeMonth(date) {
        let query = {
            month: moment(date).format('M'),
            year: moment(date).format('Y'),
        }
        await this.props.getUser(this.props.match.params.id, query);
        this.setState({ query: query });
    }

    render() {
        var { config, user } = this.props;
        var { isLoading, query } = this.state;

        const statuses = [
            { value: 1, label: 'Active' },
            { value: 0, label: 'Inactive' },
        ];

        const majors = [
            { value: 0, label: 'Tất cả' },
            { value: 1, label: 'Phần cứng' },
        ];

        const columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
                width: '50px',
                sorter: true,
            },
            {
                title: 'Tên khách hàng',
                dataIndex: 'name',
                key: 'name',
                width: '250px',
                render: (text, record) => {
                    var datediff = moment().diff(moment(record.created_at), 'days');
                    if (datediff < 30) {
                        return (
                            <Badge count={'new'} offset={[20, 0]}>
                                <Link to={`/customers/${record.id}`}>{text}</Link>
                                <div><b>MST:</b> {record.tax}</div>
                            </Badge>
                        )
                    } else {
                        return (
                            <div>
                                <Link to={`/customers/${record.id}`}>{text}</Link>
                                <div><b>MST:</b> {record.tax}</div>
                            </div>
                        )
                    }

                }
            },
            {
                title: 'Liên hệ',
                dataIndex: 'email, phone',
                key: 'email',
                width: '200px',
                render: (text, record) => {
                    return (
                        <div>
                            {
                                record.phone ? (<div><b>SĐT: </b>{record.phone}</div>) : null
                            }
                            {
                                record.email ? (<div><b>Email: </b>{record.email}</div>) : null
                            }
                        </div>
                    )
                }
            }
        ];

        if (isLoading) {
            return (
                <div className="text-center">
                    <Spin />
                </div>
            )
        }

        return (
            <div>
                <PageTitle title="Chi tiết user" routes={routes} />
                {
                    user.role == 3 ? (
                        <Row gutter={16}>
                            <Col lg={8} md={24}>
                                <UserDetailForm user={user} roles={config.roles} statuses={statuses} majors={majors} onSubmit={this.onUpdate} />
                            </Col>
                            <Col lg={16} md={24}>
                                <Card className="mb-4">
                                    <Row justify="space-between" align="middle">
                                        <Typography.Title level={4}>Doanh thu tháng {query.month}/{query.year}</Typography.Title>
                                        <DatePicker.MonthPicker format="MM/YYYY" placeholder="Chọn tháng" onChange={(date) => this.onChangeMonth(date)} />
                                    </Row>
                                    <NumberFormat value={user.real_revenue} displayType={'text'} thousandSeparator={true} /> VND
                                </Card>
                                <Card className="mb-4">
                                    <Typography.Title level={4}>Khách hàng tiếp nhận ({user.customers.length} khách hàng)</Typography.Title>
                                    <Table
                                        rowKey="id"
                                        size='default'
                                        tableLayout='auto'
                                        columns={columns}
                                        dataSource={user.customers}
                                        pagination={{
                                            pageSize: 5
                                        }}
                                        scroll={{
                                            x: 'max-content'
                                        }}
                                    />
                                </Card>
                            </Col>
                        </Row>
                    ) : (
                            <Row gutter={16}>
                                <Col lg={12} md={24}>
                                    <UserDetailForm user={user} roles={config.roles} statuses={statuses} onSubmit={this.onUpdate} />
                                </Col>
                            </Row>
                        )
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        config: state.config,
        user: state.user.currentUser
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createUser: (data) => dispatch(createUser(data)),
        getUser: (id, filter) => dispatch(getUser(id, filter)),
        updateUser: (id, data) => dispatch(updateUser(id, data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail);