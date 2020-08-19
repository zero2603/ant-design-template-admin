import React, { Component } from 'react';
import ImagePreview from '../ImagePreview';
import { Row } from "antd";

class ListImagePreview extends Component {

    static defaultProps = {
        data: [],
        removeImage: () => { }
    }

    render() {
        const { data } = this.props;
        return (
            <Row>
                {
                    data.map((item,index) => {
                        return (

                            <ImagePreview image={item} key={index} removeImage={(image) => this.props.removeImage(image)}></ImagePreview>
                        )
                    })
                }
            </Row>
        )
    }
}

export default ListImagePreview;

