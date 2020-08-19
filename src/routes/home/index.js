import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Row, Col, Card, Typography, PageHeader } from 'antd';
import {
    PlusCircleOutlined,
    QuestionCircleOutlined,
    ShareAltOutlined,
    ShoppingCartOutlined,
    SmileOutlined,
    TagsOutlined,
    UserOutlined,
    ArrowUpOutlined,
    ArrowDownOutlined,
    ArrowRightOutlined,
    InfoCircleOutlined,
    AuditOutlined,
    SettingOutlined,
    CustomerServiceOutlined,
    CloudServerOutlined
} from '@ant-design/icons';
import ModuleCard from './ModuleCard';

const administrationModules = [
    {
        path: '/statistic',
        name: 'Thống kê'
    },
    {
        path: '/users',
        name: 'Quản lý user'
    },
    {
        path: '/permissions',
        name: 'Phân quyền'
    },
]

const customerServiceModules = [
    {
        path: '/requests?time=today',
        name: 'Hỗ trợ trong ngày'
    },
    {
        path: '/slow-requests',
        name: 'Hỗ trợ chậm'
    },
    {
        path: '/requests-count',
        name: 'Số lần hỗ trợ từng khách'
    },
    {
        path: '/canceled-products',
        name: 'Danh sách sản phẩm cắt huỷ'
    },
    {
        path: '/customer-history',
        name: 'Lịch sử làm việc với khách hàng'
    },
    {
        path: '/product-overload',
        name: 'Thông báo dịch vụ quá tải'
    },
    {
        path: '/support-call',
        name: 'Cuộc gọi chăm sóc khách hàng'
    },
]

const businessModules = [
    {
        path: '/customers',
        name: 'Khách hàng'
    },
    {
        path: '/requests?type=1',
        name: 'Yêu cầu khởi tạo dịch vụ'
    },
    {
        path: '/active-products?is_verify=0',
        name: 'Dịch vụ chưa kiểm duyệt'
    },
    {
        path: '/running-out-products',
        name: 'Dịch vụ gia hạn 30 ngày tới'
    },
    {
        path: '/expired-products',
        name: 'Dịch vụ quá hạn'
    },
    {
        path: '/canceled-products',
        name: 'Dịch vụ cắt huỷ'
    },
    {
        path: '/potential-customers',
        name: 'Khách hàng tiềm năng'
    },
]

const majorModules = [
    {
        path: '/warehouses',
        name: 'Quản lý kho'
    },
    {
        path: '/notifications',
        name: 'Khuyến mãi'
    },
    {
        path: '/documentations',
        name: 'Tài liệu / Mẫu văn bản'
    },
]

class Home extends Component {
    state = {
        isShowModuleGrid: true,
        title: '',
        modules: []
    }

    onClickModuleCard(redirectPath = null, title = '', modules = []) {
        if (redirectPath) {
            this.props.history.push(redirectPath);
        } else {
            this.setState({
                modules: modules,
                title: title,
                isShowModuleGrid: false
            })
        }
    }

    onBack() {
        this.setState({
            isShowModuleGrid: true,
            modules: [],
            title: '',
        })
    }

    render() {
        var { isShowModuleGrid, title, modules } = this.state;
        var { authUser } = this.props;

        console.log()

        var parentModules = [
            {
                className: 'card-green',
                title: 'KHÁCH HÀNG',
                icon: <UserOutlined className='home-widget-icon' />,
                onClick: () => this.onClickModuleCard('/customers')
            },
            {
                className: 'card-orange',
                title: 'DỊCH VỤ',
                icon: <CloudServerOutlined className='home-widget-icon' />,
                onClick: () => this.onClickModuleCard('/active-products')
            },
            {
                className: 'card-blue',
                title: 'QUẢN TRỊ',
                icon: <SettingOutlined className='home-widget-icon' />,
                onClick: () => this.onClickModuleCard(null, 'Quản trị', administrationModules)
            },
            {
                className: 'card-yellow',
                title: "HỖ TRỢ KỸ THUẬT",
                icon: <QuestionCircleOutlined className='home-widget-icon' />,
                onClick: () => this.onClickModuleCard('/requests')
            },
            {
                className: 'card-violet',
                title: 'CHĂM SÓC KHÁCH HÀNG',
                icon: <CustomerServiceOutlined className='home-widget-icon' />,
                onClick: () => this.onClickModuleCard(null, 'Chăm sóc khách hàng', customerServiceModules)
            },
            {
                className: 'card-red',
                title: "KINH DOANH",
                icon: <ShoppingCartOutlined className='home-widget-icon' />,
                onClick: () => this.onClickModuleCard(null, 'Kinh doanh', businessModules)
            },
            {
                className: 'card-black',
                title: "NGHIỆP VỤ",
                icon: <AuditOutlined className='home-widget-icon' />,
                onClick: () => this.onClickModuleCard(null, 'Nghiệp vụ', majorModules)
            }
        ]

        switch(authUser.role_code) {
            case 'KD': {
                delete parentModules[1];
                delete parentModules[2];
                delete parentModules[4];
                break;
            }
            case 'KTH': {
                delete parentModules[0];
                delete parentModules[1];
                delete parentModules[2];
                delete parentModules[4];
                delete parentModules[5];
                delete parentModules[6];
                break;
            }
            case 'DVKH': {
                delete parentModules[2];
                delete parentModules[4];
                delete parentModules[5];
                break;
            }
            case 'CSKH': {
                delete parentModules[2];
                delete parentModules[5];
                break;
            }
            case 'KT': {
                delete parentModules[2];
                delete parentModules[3];
                delete parentModules[4];
                delete parentModules[5];
                break;
            }
            default: break;
        } 

        if (isShowModuleGrid) {
            return (
                <div>
                    <Row align="middle" justify="center">
                        <Col md={16} sm={24}>
                            <Row gutter={15}>
                                {
                                    parentModules.map((item, index) => (
                                        <Col lg={8} md={12} sm={24} key={index} className="w-100 mb-2">
                                            <ModuleCard
                                                className={`${item.className} align-items-center`}
                                                title={item.title}
                                                icon={item.icon}
                                                onClick={item.onClick}
                                            />
                                        </Col>
                                    ))
                                }
                            </Row>
                        </Col>
                    </Row>
                </div>
            )
        } else {
            return (
                <div>
                    <PageHeader onBack={() => this.onBack()} title={title} className="site-page-header" />
                    <div className="mt-4"></div>
                    <Row gutter={15}>
                        {
                            modules.map((item, index) => {
                                return (
                                    <Col lg={8} md={12} sm={24} key={index} className="w-100">
                                        <Card className="mt-4">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <Link to={item.path}>{item.name}</Link>
                                                <Link to={item.path}>
                                                    <ArrowRightOutlined />
                                                </Link>
                                            </div>
                                        </Card>
                                    </Col>
                                )
                            })
                        }
                    </Row>
                </div>
            )
        }
    }
}

function mapStateToProps(state) {
    return {
        authUser: state.auth.authUser
    }
}

export default connect(mapStateToProps)(Home);