import React, { Component } from 'react';
import './image.css';

class Image extends Component {

    render() {
        const image = this.props.image;
        return (
            <div style={{display: "inline-block"}}>
                <i className="zmdi zmdi-close-circle delete-image" onClick={() => this.props.removeImage(image)} ></i>
                <img
                    className="img-job-detail"
                    src={image.url}
                    alt={image.name || 'img-preview'}
                />
            </div>
        )
    }
}

export default Image;

