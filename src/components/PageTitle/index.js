import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { PageHeader } from 'antd';

/**
 * render function for breadcrumb
 * @param {*} route 
 * @param {*} params 
 * @param {*} routes 
 * @param {*} paths 
 */
const itemRender = (route, params, routes, paths) => {
    const last = routes.indexOf(route) === routes.length - 1;
    return last ? (
        <span>{route.breadcrumbName}</span>
    ) : (
            <Link to={`/${paths.join('/')}`}>{route.breadcrumbName}</Link>
        );
}

class PageTitle extends Component {
    render() {
        var {title, routes} = this.props;

        return (
            <PageHeader
                className="site-page-header"
                onBack={() => this.props.history.goBack()}
                title={title}
                breadcrumb={{ routes: routes, itemRender: itemRender }}
            />
        )
    }
}

export default withRouter(PageTitle);