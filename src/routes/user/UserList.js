import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CheckCircleTwoTone, CloseCircleTwoTone, EditOutlined } from '@ant-design/icons';
import { Table, Divider, Tag, Button, Modal, Card } from 'antd';
import PageTitle from '../../components/PageTitle';
import TableActionBar from '../../components/TableActionBar';
import _ from 'lodash';
import qs from 'qs';
import { cleanObject } from '../../utils/helpers';
import { Link } from 'react-router-dom';
import { checkPermission } from '../../utils/permission';
// actions
import { getAllUsers, getUser, updateUser, removeUsers } from '../../redux/actions/UserActions';
import UserForm from './UserForm';
import BaseSelect from '../../components/Elements/BaseSelect';

const routes = [
    {
        path: '/',
        breadcrumbName: 'Trang chủ',
    },
    {
        path: '/users',
        breadcrumbName: 'Danh sách user',
    },
]

class UserList extends Component {
    state = {
        isLoading: false, // loading table
        selectedRowKeys: [], // id of selected rows
        isOpenUserForm: false,
        currentUser: null
    }

    componentDidMount() {
        var query = qs.parse(this.props.location.search.slice(1));
        this.setState({ isLoading: true });
        this.props.getAllUsers(query).then(() => {
            this.setState({ isLoading: false });
        })
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.location.search !== this.props.location.search) {
            var query = qs.parse(nextProps.location.search.slice(1));
            this.setState({ isLoading: true });
            this.props.getAllUsers(query).then(() => {
                this.setState({
                    isLoading: false
                })
            });
        }
    }

    onSelectChange = selectedRowKeys => {
        this.setState({ selectedRowKeys });
    };

    onChangeFilter(name, value) {
        var query = qs.parse(this.props.location.search.slice(1));
        query = {
            ...query,
            [name]: value
        }
        query.page = 1;
        query = cleanObject(query); // remove empty fields

        this.props.history.push({
            pathname: '/users',
            search: qs.stringify(query)
        });
    }

    onChangeTable(pagination, sorter) {
        var query = qs.parse(this.props.location.search.slice(1));
 
        if (!_.isEmpty(pagination)) {
            query = {
                ...query,
                page: pagination.current,
                per_page: pagination.pageSize,
            }
        }
        if (!_.isEmpty(sorter)) {
            if (sorter.order) {
                query = {
                    ...query,
                    sort_field: sorter.field,
                    sort_type: sorter.order == 'ascend' ? 'ASC' : 'DESC'
                }
            } else {
                delete query.sort_field;
                delete query.sort_type;
            }
        }

        this.props.history.push({
            pathname: '/users',
            search: qs.stringify(query)
        });

    }

    toggleOpenForm(isOpenUserForm, user = null) {
        this.setState({ isOpenUserForm: isOpenUserForm, currentUser: user });
    }

    onEdit(id) {
        this.props.getUser(id).then(user => {
            this.toggleOpenForm(true, user);
        })
    }

    onRemove() {
        this.props.removeUsers(this.state.selectedRowKeys).then(() => {
            this.setState({
                selectedRowKeys: []
            });
            
            Modal.destroyAll();
        })
    }

    render() {
        var { users, pagination, config } = this.props;
        var { isLoading, selectedRowKeys, isOpenUserForm, currentUser } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;

        // query string
        var query = qs.parse(this.props.location.search.slice(1));

        const columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
                sorter: true
            },
            {
                title: 'Tên đăng nhập',
                dataIndex: 'user_name',
                key: 'user_name',
                render: (text, record) => (
                    <Link to={`/users/${record.id}`}>{text}</Link>
                ),
                sorter: true
            },
            {
                title: 'Email',
                dataIndex: 'user_email',
                key: 'user_email',
                sorter: true
            },
            {
                title: 'Quyền truy cập',
                dataIndex: 'role_name',
                key: 'role_name',
            },
            {
                title: 'Trạng thái',
                dataIndex: 'user_active',
                key: 'user_active',
                align: 'center',
                render: (text, record) => {
                    if (text == 1) return <CheckCircleTwoTone twoToneColor="#52c41a" />;
                    if (text == 0) return <CloseCircleTwoTone twoToneColor="#e74c3c" />;
                }
            },
            {
                title: 'Actions',
                render: (text, record) => (
                    <div>
                        <Link to={`/users/${record.id}`}>
                            <Button type="primary" shape="round" icon={<EditOutlined />} >Sửa</Button>
                        </Link>
                    </div>
                )
            },
        ];

        return (
            <div>
                <PageTitle
                    title="Danh sách user" 
                    routes={routes}
                />
                <div>
                    <TableActionBar
                        isShowAddButton={checkPermission('user', 'create')}
                        isShowDeleteButton={checkPermission('user', 'remove')}
                        onAdd={() => this.toggleOpenForm(true)}
                        onDelete={() => this.onRemove()}
                        disabled={!selectedRowKeys.length ? true : false}
                        showFilter
                        activeFilter={query.role || query.user_active}
                        onSearch={(value) => this.onChangeFilter('keyword', value)}
                        defaultKeyword={query.keyword}
                        filters={
                            [
                                <BaseSelect
                                    style={{ width: '150px' }}
                                    onChange={(value) => this.onChangeFilter("role", value)}
                                    options={config.roles}
                                    defaultText="Vai trò"
                                    optionValue="id"
                                    optionLabel="name"
                                    defaultValue={query.role ? parseInt(query.role) : ''}
                                />,
                                <BaseSelect
                                    style={{ width: '150px' }}
                                    onChange={(value) => this.onChangeFilter("user_active", value)}
                                    options={[
                                        { label: "Trạng thái", value: "" },
                                        { label: "Active", value: '1' },
                                        { label: "Inactive", value: '0' },
                                    ]}
                                    defaultValue={query.user_active || ''}
                                />
                            ]
                        }
                    >
                        {
                            hasSelected ? <span style={{ marginLeft: '10px' }}>Đang chọn {selectedRowKeys.length} bản ghi</span> : ''
                        }
                    </TableActionBar>
                </div>
                    <Table
                        rowKey="id"
                        dataSource={users}
                        columns={columns}
                        loading={isLoading}
                        rowSelection={rowSelection}
                        pagination={{
                            pageSize: pagination.perPage,
                            current: pagination.currentPage,
                            total: pagination.total,
                            showTotal: total => `Tổng ${total} bản ghi`
                        }}
                        onChange={(pagination, filters, sorter) => this.onChangeTable(pagination, sorter)}
                        scroll={{
                            x: 'max-content'
                        }}
                    />
                <UserForm
                    visible={isOpenUserForm}
                    user={currentUser}
                    onCancel={() => this.toggleOpenForm(false)}
                />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        users: state.user.users,
        pagination: state.user.pagination,
        config: state.config
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllUsers: (filter) => dispatch(getAllUsers(filter)),
        getUser: (id) => dispatch(getUser(id)),
        removeUsers: (ids) => dispatch(removeUsers(ids))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
