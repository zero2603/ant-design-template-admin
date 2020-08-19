import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { PlusOutlined, SearchOutlined, FilterFilled, FilterOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, Divider, Modal, Tooltip, Input, Col, Row } from 'antd';
import PropTypes from 'prop-types';
const { Search } = Input;
const confirm = Modal.confirm;


class TableActionBar extends Component {

    static propTypes = {
        showSearch: PropTypes.bool,
        onSearch: PropTypes.func,
        searchOpition: PropTypes.object,
        showFilter: PropTypes.bool,
        showActionButton: PropTypes.bool,
        disabled: PropTypes.bool,
        filters: PropTypes.array,
        activeFilter: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.number,
            PropTypes.string
        ]),
        addText: PropTypes.string
    }

    static defaultProps = {
        onSearch: () => { },
        showSearch: true,
        searchOpition: {},
        isShowPublishButtons: true,
        isShowAddButton: true,
        isShowDeleteButton: true,
        showFilter: true,
        showActionButton: true,
        disabled: false,
        filters: [],
        activeFilter: false,
        defaultKeyword: '',
        addText: 'Thêm mới'
    }

    state = {
        activeFilter: this.props.activeFilter
    }

    onOpenFilter() {
        this.setState({
            activeFilter: !this.state.activeFilter
        })
    }

    openAlert() {
        confirm({
            title: 'Cảnh báo',
            content: 'Bạn chắc chắn muốn xoá những bản ghi này?',
            okText: 'OK',
            cancelText: 'Huỷ',
            onOk: () => this.props.onDelete(),
            onCancel: () => { },
        })
    }

    onClearFilter() {
        this.props.history.push({
            pathname: this.props.location.pathname,
            search: ''
        });
        this.setState({activeFilter: false})
    }

    render() {
        const { showFilter, searchOpition, showSearch, isShowAddButton, isShowDeleteButton, showActionButton, disabled, filters, defaultKeyword } = this.props;
        var { activeFilter } = this.state;

        return (
            <div style={{ margin: "10px 0" }} >
                <Row type="flex" align="middle" >
                    {
                        showActionButton ?
                            <Col sm={{ span: 18 }} xs={{ span: 24 }} >
                                {
                                    isShowAddButton ? (
                                        <Button className="table-button" htmlType="submit" type="primary" onClick={() => this.props.onAdd()} icon={<PlusOutlined />} >
                                            {this.props.addText}
                                        </Button>
                                    ) : null
                                }
                                {
                                    isShowAddButton && isShowDeleteButton ? <Divider type="vertical" /> : null
                                }
                                {
                                    isShowDeleteButton ? (
                                        <Button className="table-button" type="danger" onClick={() => this.openAlert()} disabled={disabled} >
                                            Xoá
                                        </Button>
                                    ) : null
                                }
                                {
                                    isShowAddButton || isShowDeleteButton ? <Divider type="vertical" /> : null
                                }
                                {this.props.children}
                            </Col>
                            : <Col sm={{ span: 18 }} xs={{ span: 24 }} ></Col>
                    }

                    <Col sm={{ span: 6 }} xs={{ span: 24 }} style={{ display: 'flex' }} >
                        {
                            showSearch ?
                                <Search
                                    name="keyword"
                                    className="txtSearch"
                                    placeholder="Tìm kiếm..."
                                    onSearch={value => this.props.onSearch(value)}
                                    enterButton={<SearchOutlined />}
                                    style={{ width: '100%' }}
                                    defaultValue={defaultKeyword}
                                    allowClear
                                    {...searchOpition}
                                />
                                : null
                        }
                        {
                            showFilter ?
                                <Tooltip title="Filter">
                                    <div onClick={() => this.onOpenFilter()}>
                                        {
                                            activeFilter ? <FilterFilled className="filter-icon" style={{ color: "#3498db" }} /> : <FilterOutlined className="filter-icon" />
                                        }
                                    </div>
                                </Tooltip>
                                : null
                        }
                    </Col>
                </Row>
                {
                    activeFilter ? (
                        <div className="mt-4">
                            {
                                filters.map((filter, index) => <div className="mr-2 mb-2 d-inline-block" key={index}>{filter}</div>)
                            }
                            <Button shape="round" icon={<CloseOutlined />} className="clear-button" onClick={() => this.onClearFilter()}>Xoá bộ lọc</Button>
                        </div>
                    ) : null
                }
            </div>
        );
    }
}


export default withRouter(TableActionBar);