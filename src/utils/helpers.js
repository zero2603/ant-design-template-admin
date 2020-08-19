/**
 * Helpers Functions
 */
import moment from 'moment';
import React, { Component } from 'react';
import { Tag, Row, Col, } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import NumberFormat from 'react-number-format';
import { Link } from 'react-router-dom';

/**
 * Function to convert hex to rgba
 */
export function hexToRgbA(hex, alpha) {
    var c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        c = hex.substring(1).split('');
        if (c.length === 3) {
            c = [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c = '0x' + c.join('');
        return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',' + alpha + ')';
    }
    throw new Error('Bad Hex');
}

/**
 * Text Truncate
 */
export function textTruncate(str, length, ending) {
    if (length == null) {
        length = 100;
    }
    if (ending == null) {
        ending = '...';
    }
    if (str.length > length) {
        return str.substring(0, length - ending.length) + ending;
    } else {
        return str;
    }
}

/**
 * Get Date
 */
export function getTheDate(timestamp, format) {
    let time = timestamp * 1000;
    let formatDate = format ? format : 'MM-DD-YYYY';
    return moment(time).format(formatDate);
}

/**
 * Convert Date To Timestamp
*/
export function convertDateToTimeStamp(date, format) {
    let formatDate = format ? format : 'YYYY-MM-DD';
    return moment(date, formatDate).unix();
}

/**
 * Function to return current app layout
 */
export function getAppLayout(url) {
    let location = url.pathname;
    let path = location.split('/');
    return path[1];
}

/**
 * 
 * @param {int} x 
 * Thousand delimiter
 */
export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

/**
 * 
 * @param {*function} callback 
 * @param {*number} delay 
 * @param  {...any} args 
 * 
 */
export function debounce(callback, delay, ...args) {
    const timerClear = () => clear = true;
    var clear = true;
    return event => {
        if (clear) {
            clear = false;
            setTimeout(timerClear, delay);
            callback(event, ...args);
        }
    }
}


export function capitalize(s) {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

export function getFirstLetterOfWords(str) {
    var acronym = '';
    let temp = str.split(" ");
    if (temp.length >= 2) acronym = temp[temp.length - 2].charAt(0) + temp[temp.length - 1].charAt(0);
    else acronym = str.charAt(0);
    // var matches = str.match(/\b(\w)/g);
    // if(!matches) return str.charAt(0);

    return acronym;
}

export function cleanObject(obj) {
    Object.keys(obj).map(key => {
        if (obj[key] === "" || obj[key] === null || obj[key] === undefined) {
            delete obj[key];
        }
    });

    return obj;
}

export function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

/**
 * render function for breadcrumb
 * @param {*} route 
 * @param {*} params 
 * @param {*} routes 
 * @param {*} paths 
 */
export const itemRender = (route, params, routes, paths) => {
    const last = routes.indexOf(route) === routes.length - 1;
    return last ? (
        <span>{route.breadcrumbName}</span>
    ) : (
            <Link to={`/${paths.join('/')}`}>{route.breadcrumbName}</Link>
        );
}

/**
 * 
 * @param {*} type 
 * mapping request type
 */
export function convertRequestType(type) {
    switch (type) {
        // old types
        case 0: return <Tag color="purple">Hỗ trợ</Tag>;
        case 1: return <Tag color="purple">Khởi tạo</Tag>;
        case 2: return <Tag color="red">Cắt hủy</Tag>;
        case 3: return <Tag color="gold">Tạm dừng</Tag>;
        case 4: return <Tag color="blue">Bật lại</Tag>;
        case 5: return <Tag color="lime">Bổ sung</Tag>;
        // new types
        case 10: return <Tag color="#f50">Hỗ trợ kỹ thuật</Tag>;
        case 20: return <Tag color="#f50">Hỗ trợ tư vấn đăng ký mới dịch vụ</Tag>;
        case 21: return <Tag color="#f50">Hỗ trợ các vấn đề cho khách hàng là đại lý</Tag>;
        case 22: return <Tag color="#f50">Hỗ trợ tư vấn gia hạn dịch vụ</Tag>;
        case 30: return <Tag color="#f50">Than phiền - Góp ý</Tag>;
        case 40: return <Tag color="#f50">Hỗ trợ dịch vụ Hóa đơn điện tử</Tag>;
        case 41: return <Tag color="#f50">Hỗ trợ chuyên sâu về nghiệp vụ kế toán</Tag>;
        case 50: return <Tag color="#f50">Hỗ trợ thay đổi Thông tin- Hồ sơ - Hợp đồng</Tag>;
        case 60: return <Tag color="#f50">Phản hồi đến giám đốc</Tag>;
        default: return null;
    }
}

/**
 * 
 * @param {*} url URL need to download
 * Downlaod without pop-up block warning
 */
export const downloadFromLink = (url, filename) => {
    let link = document.createElement("a");
    link.download = filename;
    link.href = url;
    link.click();
    URL.revokeObjectURL(link.href);
}

/**
 * 
 * @param {*} type 
 * mapping customer source
 */
export function convertCustomerSource(type) {
    switch (type) {
        case 1: return "Khách hàng từ chat";
        case 2: return "Khách hàng gọi điện";
        case 3: return "Khách cũ dùng lại";
        case 4: return "Khách hàng giới thiệu";
        case 5: return "Khách hàng tự tìm";
        case 6: return "Khách cũ dùng thêm";
        default: return null;
    }
}

export function handleProductHistoryItem(item) {
    delete item['customer_id'];
    delete item['customer_id_change'];
    delete item['category_id'];
    delete item['category_id_change'];
    delete item['user_id'];
    delete item['user_id_change'];
    // delete item['user_change'];
    // delete item['user_change_name'];
    // delete item['product_id'];
    // delete item['created_at'];



    return Object.keys(item).map(key => {
        let label = '';
        let type = 'normal';
        let isValid = true; // valid field

        switch (key) {
            case 'customer_name': {
                label = 'Khách hàng';
                break;
            }
            case 'contract_no': {
                label = 'Số HĐ';
                break;
            }
            case 'category_title': {
                label = 'Danh mục dịch vụ';
                break;
            }
            case 'datacenter': {
                label = 'Datacenter';
                break;
            }
            case 'description': {
                label = 'Mô tả gói dịch vụ';
                break;
            }
            case 'os': {
                label = 'Hệ điều hành';
                break;
            }
            case 'accompanied_service': {
                label = 'Dịch vụ kèm theo';
                break;
            }
            case 'ip': {
                label = 'Địa chỉ IP';
                break;
            }
            case 'sign_date': {
                label = 'Ngày ký HĐ';
                type = 'date';
                break;
            }
            case 'charging_date': {
                label = 'Ngày tính cước';
                type = 'date';
                break;
            }
            case 'renew_date': {
                label = 'Ngày gia hạn';
                type = 'date';
                break;
            }
            case 'term': {
                label = 'Kỳ hạn';
                break;
            }
            case 'revenue_per_month': {
                label = 'Doanh thu / Tháng';
                type = 'money';
                break;
            }
            case 'total_without_vat': {
                label = 'Thanh toán chưa VAT';
                type = 'money';
                break;
            }
            case 'total_with_vat': {
                label = 'Thanh toán có VAT';
                type = 'money';
                break;
            }
            case 'purchase_date': {
                label = 'Ngày tiền về';
                type = 'date';
                break;
            }
            case 'purchase_amount': {
                label = 'Tiền về';
                type = 'money';
                break;
            }
            case 'real_revenue_per_month': {
                label = 'Doanh thu / Tháng (DT thực tế)';
                type = 'money';
                break;
            }
            case 'real_revenue_without_vat': {
                label = 'Thanh toán chưa VAT (DT thực tế)';
                type = 'money';
                break;
            }
            case 'payment_status': {
                label = 'Tình trạng thanh toán';
                break;
            }
            case 'payment_type': {
                label = 'Hình thức thanh toán';
                break;
            }
            case 'initial_status': {
                label = 'Trạng thái khởi tạo';
                break;
            }
            case 'is_overload': {
                label = 'Tình trạng quá tải';
                break;
            }
            case 'user_name': {
                label = 'Nhân viên kinh doanh';
                break;
            }
            case 'is_confirm_sending_mail': {
                label = 'Xác nhận gửi mail';
                break;
            }
            case 'note': {
                label = 'Ghi chú';
                break;
            }
            case 'website': {
                label = 'Website';
                break;
            }
            case 'field': {
                label = 'Lĩnh vực';
                break;
            }
            case 'source': {
                label = 'Nguồn khách hàng';
                item.source = convertCustomerSource(item.source);
                item.source_change = convertCustomerSource(item.source_change);
                break;
            }
            case 'signer_name': {
                label = 'Người ký HĐ';
                break;
            }
            case 'signer_position': {
                label = 'Chức vụ người ký';
                break;
            }
            case 'signer_email': {
                label = 'Email người ký';
                break;
            }
            case 'signer_phone': {
                label = 'Số điện thoại người ký';
                break;
            }
            case 'contact_name': {
                label = 'Người liên hệ';
                break;
            }
            case 'contact_phone': {
                label = 'Số điện thoại người liên hệ';
                break;
            }
            case 'contact_email': {
                label = 'Email người liên hệ';
                break;
            }
            case 'payer_name': {
                label = 'Người thanh toán';
                break;
            }
            case 'payer_phone': {
                label = 'Số điện thoại người thanh toán';
                break;
            }
            case 'payer_email': {
                label = 'Email người thanh toán';
                break;
            }
            case 'payer_address': {
                label = 'Địa chỉ chuyển phát nhanh';
                break;
            }
            default: {
                isValid = false;
                break;
            }
        }

        if (!isValid) return null;

        if (item[key] != item[`${key}_change`]) {
            return (
                <Row>
                    <Col span={10}>
                        <b>{label}</b>
                    </Col>
                    <Col span={6}>
                        <div>
                            {
                                type == 'date' ? moment(item[key]).format('DD/MM/YYYY') : (
                                    <React.Fragment>
                                        {
                                            type == 'money' ? <NumberFormat value={item[key]} displayType={'text'} thousandSeparator='.' decimalSeparator=',' /> : item[key]
                                        }
                                    </React.Fragment>
                                )
                            }
                        </div>
                    </Col>
                    <Col span={2}><ArrowRightOutlined /></Col>
                    <Col span={6} style={{ textAlign: "right" }}>
                        <div>
                            {
                                type == 'date' ? moment(item[`${key}_change`]).format('DD/MM/YYYY') : (
                                    <React.Fragment>
                                        {
                                            type == 'money' ? <NumberFormat value={item[`${key}_change`]} displayType={'text'} thousandSeparator='.' decimalSeparator=',' /> : item[`${key}_change`]
                                        }
                                    </React.Fragment>
                                )
                            }
                        </div>
                    </Col>
                </Row>
            )
        }
    });
}

/**
 * Format number thousand seperator
 * @param {*} num original number
 */
export function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}