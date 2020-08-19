import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Table, Button, Modal, Input } from 'antd';
// import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
import TableActionBar from '../../components/TableActionBar';
import _ from 'lodash';
import qs from 'qs';
// actions
import { getAllRoles, removeRoles, createNewRole } from '../../redux/actions/RoleActions';
import { cleanObject } from '../../utils/helpers';

class UserRole extends Component {
    state = {
        isLoading: false, // loading table
        selectedRowKeys: [], // id of selected rows
        isOpenUserForm: false,
        currentUser: null,
        visible: false
    }

    componentDidMount() {
        var query = qs.parse(this.props.location.search.slice(1));
        this.setState({ isLoading: true });
        this.props.getAllRoles(query).then(() => {
            setTimeout(() => {
                this.setState({ isLoading: false });
            }, 800);
        })
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.location.search !== this.props.location.search) {
            var query = qs.parse(nextProps.location.search.slice(1));
            this.setState({ isLoading: true });
            this.props.getAllRoles(query).then(() => {
                setTimeout(() => {
                    this.setState({
                        isLoading: false
                    })
                }, 800)
            });
        }
    }

    onSelectChange = selectedRowKeys => {
        this.setState({ selectedRowKeys });
    };

    onChangeTable(pagination, sorter) {
        var query = qs.parse(this.props.location.search.slice(1));
        //var queries = {};
        if (!_.isEmpty(pagination)) {
            query = {
                ...query,
                page: pagination.current,
                per_page: pagination.pageSize,
            }
        }
        if (!_.isEmpty(sorter)) {
            query = {
                ...query,
                sort_field: sorter.field,
                sort_type: sorter.order == 'ascend' ? 'ASC' : 'DESC'
            }
        }

        this.props.history.push({
            pathname: '/users/roles',
            search: qs.stringify(query)
        });
    }

    onChangeFilter(name, value) {
        var query = qs.parse(this.props.location.search.slice(1));
        query = {
            ...query,
            [name]: value
        }
        query = cleanObject(query); // remove empty fields

        this.props.history.push({
            pathname: '/users/roles',
            search: qs.stringify(query)
        });
    }

    openForm() {
        this.setState({visible: true});
    }

    onRemove() {
        this.props.removeRoles(this.state.selectedRowKeys).then(() => {
            this.setState({
                selectedRowKeys: []
            });
            setTimeout(() => {
                Modal.destroyAll();
            }, 800);
        })
    }

    onCancel() {
        this.setState({visible: false});
    }

    submit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.createNewRole(values).then(() => {
                    this.props.form.resetFields();
                    this.onCancel();
                })
            }
        });
    }

    render() {
        var { roles, pagination } = this.props;
        var { isLoading, selectedRowKeys, visible } = this.state;

        const { getFieldDecorator } = this.props.form;

        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;

        const columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
                sorter: true
            },
            {
                title: 'Tên quyền',
                dataIndex: 'name',
                key: 'name',
                render: (text, record) => (
                    <Button type="link" onClick={() => this.onEdit(record.user_id)}>{text}</Button>
                ),
                sorter: true
            },
        ];

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

        return (
            <div>
                {/* <PageTitleBar match={this.props.match} title="Danh sách quyền" /> */}
                <div>
                    <TableActionBar
                        onAdd={() => this.openForm()}
                        onDelete={() => this.onRemove()}
                        disabled={!selectedRowKeys.length ? true : false}
                        // showFilter
                        onSearch={(value) => this.onChangeFilter('keyword', value)}
                    >
                        {
                            hasSelected ? <span style={{ marginLeft: '10px' }}>Đang chọn {selectedRowKeys.length} bản ghi</span> : ''
                        }
                    </TableActionBar>
                </div>
                <Table
                    rowKey="id"
                    dataSource={roles}
                    columns={columns}
                    loading={isLoading}
                    rowSelection={rowSelection}
                    pagination={{
                        pageSize: pagination.perPage,
                        current: pagination.currentPage,
                        total: pagination.total
                    }}
                    onChange={(pagination, filters, sorter) => this.onChangeTable(pagination, sorter)}
                    scroll={{
                        x: 'max-content'
                    }}
                />
                <Modal
                    visible={visible}
                    title={"Thêm mới quyền"}
                    onOk={(e) => this.submit(e)}
                    onCancel={() => this.onCancel()}
                    footer={[
                        <Button key="back" onClick={() => this.onCancel()}>
                            Huỷ
                        </Button>,
                        <Button key="submit" type="primary" onClick={(e) => this.submit(e)}>
                            Submit
                        </Button>,
                    ]}
                >
                    <Form {...formItemLayout}>
                        <Form.Item label="Tên quyền">
                            {getFieldDecorator('name', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Vui lòng điền tên quyền!',
                                    },
                                ],
                            })(<Input />)}
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        roles: state.role.roles,
        pagination: state.role.pagination
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllRoles: (filter) => dispatch(getAllRoles(filter)),
        removeRoles: (ids) => dispatch(removeRoles(ids)),
        createNewRole: (data) => dispatch(createNewRole(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create({ name: 'user_form' })(UserRole));