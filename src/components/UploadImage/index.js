import React, { Component } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Upload, Modal } from 'antd';
import { getBase64 } from '../../utils/helpers';
import imageCompression from 'browser-image-compression';

const compressOptions = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true
}

class UploadImage extends Component {
    state = {
        previewVisible: false,
        previewImage: '',
        fileList: [

        ],
    };

    static defaultProps = {
        onChangeData: () => { }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if(nextProps.isResetUpload) {
            this.setState({fileList: []})
        }
    }

    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };

    async setData(list) {
        let compressProcesses = list.map(item => {
            return imageCompression(item.originFileObj, compressOptions);
        });

        let files = await Promise.all(compressProcesses);

        let imageQueries = files.map(file => {
            return getBase64(file);
        })

        let listData = await Promise.all(imageQueries);

        return listData;
    }

    handleChange = async ({ fileList }) => {
        this.setState({ fileList }, async () => {
            let data = await this.setData(this.state.fileList)
            this.props.onChangeData(data);
        });
    }


    render() {
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <PlusOutlined />
                <div className="ant-upload-text">Chọn File</div>
            </div>
        );
        return (
            <div className="clearfix">
                <Upload
                    beforeUpload={() => {
                        return false;
                    }}
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                    onRemove={this.onRemove}
                    onDownload={false}
                    accept="image/*"
                    multiple
                >
                    {uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        );
    }
}

export default UploadImage;