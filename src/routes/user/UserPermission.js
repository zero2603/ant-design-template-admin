import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Row, Col, Checkbox, Alert, Button, Spin, Divider, Timeline } from 'antd';
import BaseCheckboxes from '../../components/Elements/BaseCheckboxes';
import BaseSelect from '../../components/Elements/BaseSelect';
import { chunkGroup } from '../../utils/permission';
import _ from 'lodash';
import IntlMessages from '../../components/IntlMessage';
import { NotificationManager } from 'react-notifications';
import PageTitle from '../../components/PageTitle';
// actions
import { getAllPermissions, updateRolePermissions, getPermissionsByRole, getPermissionsByUser } from '../../redux/actions/PermissionActions';
import { getAllUsers } from '../../redux/actions/UserActions';

const routes = [
    {
        path: '/',
        breadcrumbName: 'Trang chủ',
    },
    {
        path: '/permissions',
        breadcrumbName: 'Phân quyền',
    },
]

const PermissionGroup = ({ groups, permissionGroup, onCheckAll, onCheck }) => (
    <React.Fragment>
        {
            groups.map((groupChunk, index) => {
                return (
                    <Row gutter={20} style={{ height: 'max-content' }} key={index}>
                        {
                            groupChunk.map((group, index) => {
                                let groupName = group[0].route_name.split('.')[1];
                                let groupChecked = false;
                                if (permissionGroup[groupName]) {
                                    if (permissionGroup[groupName].length === group.length) groupChecked = true;
                                }

                                console.log(groupChecked);
                                return (
                                    <Col lg={8} md={8} sm={24} xs={24} key={index} className="mb-4" >
                                        <Card
                                            title={<IntlMessages id={`admin.${groupName}`} />}
                                            extra={
                                                <Checkbox
                                                    onChange={(e) => onCheckAll(e, groupName, group)}
                                                    defaultChecked={groupChecked}
                                                ></Checkbox>
                                            }
                                            style={{ marginBottom: '20px', height: '100%' }}
                                        >
                                            <BaseCheckboxes
                                                options={group}
                                                optionLabel="name"
                                                optionValue="id"
                                                vertical
                                                onChange={(checkedValues) => onCheck(checkedValues, groupName)}
                                                value={permissionGroup[groupName]}
                                                intl={true}
                                            />
                                        </Card>
                                    </Col>
                                )
                            })
                        }
                    </Row>
                )
            })
        }
    </React.Fragment>
)

function handlePermissions(permissions) {
    var permissionGroup = {};
    permissions.forEach(permission => {
        let groupName = permission.route_name.split('.')[1];
        if (!permissionGroup[groupName]) {
            permissionGroup[groupName] = [permission.id];
        } else {
            permissionGroup[groupName] = [...permissionGroup[groupName], permission.id];
        }
    })

    return permissionGroup;
}

class UserPermission extends Component {
    state = {
        permissionGroup: {},
        isLoading: false,
        currentRole: '',
        currentUser: '',
        roles: []
    }

    componentDidMount() {
        this.props.getAllPermissions();

    }

    onChangeRole(value) {
        this.setState({ currentRole: value, isLoading: true }, () => {
            this.props.getAllUsers({ role: value })
            this.props.getPermissionsByRole(this.state.currentRole).then(permissions => {
                var permissionGroup = handlePermissions(permissions);

                this.setState({ permissionGroup: permissionGroup, currentUser: '', isLoading: false });
            })
        })
    }

    onChangeUser(user) {
        if (user) {
            this.setState({ currentUser: user, isLoading: true }, () => {
                this.props.getPermissionsByUser(this.state.currentUser).then(permissions => {
                    var permissionGroup = handlePermissions(permissions);
    
                    this.setState({ permissionGroup: permissionGroup, isLoading: false });
                })
            })
        } else {
            this.props.getPermissionsByRole(this.state.currentRole).then(permissions => {
                var permissionGroup = handlePermissions(permissions);

                this.setState({ permissionGroup: permissionGroup, currentUser: '', isLoading: false });
            })  
        }
    }

    onCheck = (checkedValues, groupName) => {
        this.setState({
            permissionGroup: {
                ...this.state.permissionGroup,
                [groupName]: checkedValues
            }
        })
    }

    onCheckAll = (e, groupName, group) => {
        let values = group.map(item => item.id)
        if (e.target.checked) {
            this.setState({
                permissionGroup: {
                    ...this.state.permissionGroup,
                    [groupName]: values
                }
            })
        } else {
            this.setState({
                permissionGroup: {
                    ...this.state.permissionGroup,
                    [groupName]: []
                }
            })
        }
    }

    submit() {
        if (!this.state.currentRole) {
            NotificationManager.error("Bạn chưa chọn vai trò!")
        } else {
            let keys = Object.keys(this.state.permissionGroup);
            let permissionArr = [];
            keys.forEach(key => {
                permissionArr = [...permissionArr, ...this.state.permissionGroup[key]];
            });

            var data = {
                role: this.state.currentRole,
                permissions: permissionArr
            }

            if (this.state.currentUser) data.user = this.state.currentUser;

            this.props.updateRolePermissions(data);
        }
    }

    render() {
        var { permissions, config } = this.props;
        var { isLoading, currentRole, permissionGroup, currentUser } = this.state;

        var roles = [];
        if (config.roles) {
            roles = config.roles.slice(1);
        }
        var users = [];
        if (currentRole) {
            users = config.users.filter(item => item.role == currentRole);
        }

        const customerPermissions = ['customer', 'potential_customer', 'web_customer', 'customer_history', 'customer_support_calls'];
        const productPermissions = ['product_category', 'product', 'warehouse'];
        const servicePermissions = ['service', 'shop', 'order', 'service_category'];
        const supportPermissions = ['support_request', 'partner', 'datacenter_request'];
        const reportPermissions = ['business'];
        const administrationPermissions = ['user', 'role'];

        let customerGroup = [];
        let productGroup = [];
        let serviceGroup = [];
        let supportGroup = [];
        let reportGroup = [];
        let administrationGroup = [];
        let others = [];

        permissions.forEach(permission => {
            if (customerPermissions.indexOf(permission.resource) >= 0) {
                customerGroup.push(permission);
            } else if (productPermissions.indexOf(permission.resource) >= 0) {
                productGroup.push(permission);
            } else if (servicePermissions.indexOf(permission.resource) >= 0) {
                serviceGroup.push(permission);
            } else if (supportPermissions.indexOf(permission.resource) >= 0) {
                supportGroup.push(permission);
            } else if (reportPermissions.indexOf(permission.resource) >= 0) {
                reportGroup.push(permission);
            } else if (administrationPermissions.indexOf(permission.resource) >= 0) {
                administrationGroup.push(permission);
            } else {
                others.push(permission);
            }
        });

        customerGroup = chunkGroup(customerGroup);
        productGroup = chunkGroup(productGroup);
        serviceGroup = chunkGroup(serviceGroup);
        supportGroup = chunkGroup(supportGroup);
        reportGroup = chunkGroup(reportGroup);
        administrationGroup = chunkGroup(administrationGroup);
        others = chunkGroup(others);

        return (
            <div className="mb-4">
                <PageTitle title="Phân quyền user" routes={routes} />
                <Row gutter={8}>
                    <Col lg={4} md={6} sm={12}>Chọn loại quyền:</Col>
                    <Col md={6} sm={12}>
                        <BaseSelect
                            options={roles}
                            optionValue="id"
                            optionLabel="name"
                            value={currentRole}
                            style={{ width: '250px' }}
                            defaultText="Chọn một vai trò"
                            onChange={(value) => this.onChangeRole(value)}
                        />
                    </Col>
                    <Col md={6} sm={12}>
                        <BaseSelect
                            options={users}
                            showSearch
                            value={currentUser}
                            optionValue="user_id"
                            optionLabel="user_name"
                            style={{ width: '250px' }}
                            defaultText="Tất cả nhân viên"
                            onChange={(value) => this.onChangeUser(value)}
                        />
                    </Col>
                </Row>
                <div className="mt-4"></div>
                <Alert
                    message="Lưu ý"
                    description="User với quyền Super Admin luôn có toàn bộ quyền truy cập."
                    type="info"
                    showIcon
                />
                <div className="mt-4"></div>
                {
                    isLoading ? (
                        <div className="text-center">
                            <Spin size="large" />
                        </div>
                    ) : (
                            <React.Fragment>
                                <Timeline>
                                    <Timeline.Item>
                                        <h6>Khách hàng</h6>
                                        <PermissionGroup groups={customerGroup} permissionGroup={permissionGroup} onCheck={this.onCheck} onCheckAll={this.onCheckAll} />
                                    </Timeline.Item>
                                    <Timeline.Item>
                                        <h6>Dịch vụ</h6>
                                        <PermissionGroup groups={productGroup} permissionGroup={permissionGroup} onCheck={this.onCheck} onCheckAll={this.onCheckAll} />
                                    </Timeline.Item>                                    
                                    <Timeline.Item>
                                        <h6>Sản phẩm đối tác</h6>
                                        <PermissionGroup groups={serviceGroup} permissionGroup={permissionGroup} onCheck={this.onCheck} onCheckAll={this.onCheckAll} />
                                    </Timeline.Item>
                                    <Timeline.Item>
                                        <h6>Hỗ trợ khách hàng</h6>
                                        <PermissionGroup groups={supportGroup} permissionGroup={permissionGroup} onCheck={this.onCheck} onCheckAll={this.onCheckAll} />
                                    </Timeline.Item>
                                    <Timeline.Item>
                                        <h6>Báo cáo kinh doanh</h6>
                                        <PermissionGroup groups={reportGroup} permissionGroup={permissionGroup} onCheck={this.onCheck} onCheckAll={this.onCheckAll} />
                                    </Timeline.Item>
                                    <Timeline.Item>
                                        <h6>Quản trị hệ thống</h6>
                                        <PermissionGroup groups={administrationGroup} permissionGroup={permissionGroup} onCheck={this.onCheck} onCheckAll={this.onCheckAll} />
                                    </Timeline.Item>
                                    <Timeline.Item>
                                        <h6>Các quyền khác</h6>
                                        <PermissionGroup groups={others} permissionGroup={permissionGroup} onCheck={this.onCheck} onCheckAll={this.onCheckAll} />
                                    </Timeline.Item>
                                </Timeline>
                                <Row justify="end">
                                    <Button type="primary" onClick={() => this.submit()}>Xác nhận</Button>
                                </Row>
                            </React.Fragment>
                        )
                }


            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        permissions: state.permission.permissions,
        permissionsByRole: state.permission.permissionsByRole,
        config: state.config,
        // users: state.user.users
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllPermissions: () => dispatch(getAllPermissions()),
        updateRolePermissions: (data) => dispatch(updateRolePermissions(data)),
        getPermissionsByRole: (role) => dispatch(getPermissionsByRole(role)),
        getPermissionsByUser: (user) => dispatch(getPermissionsByUser(user)),
        getAllUsers: (filter) => dispatch(getAllUsers(filter))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPermission);