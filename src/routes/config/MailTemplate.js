import React, { Component } from 'react';
import { connect } from 'react-redux';
import EmailEditor from 'react-email-editor';
import PageTitle from '../../components/PageTitle';
import { Button, Card, Spin, Typography, Row } from 'antd';
import BaseSelect from '../../components/Elements/BaseSelect';
// actions
import { getMailTemplate, updateMailTemplate } from '../../redux/actions/MailActions';

const routes = [
    {
        path: '/',
        breadcrumbName: 'Trang chủ',
    },
    {
        path: '/config/mail-template',
        breadcrumbName: 'Cài đặt mẫu email',
    },
]

class MailTemplate extends Component {
    emailEditorRef = React.createRef();

    state = {
        isLoading: true
    }

    async componentDidMount() {
        await this.props.getMailTemplate(this.props.config.mail_templates[0].id);
        this.setState({ isLoading: false });
        if (!this.loadTemplate()) this.timer = setInterval(this.loadTemplate, 500);
    }

    loadTemplate = () => {
        const myEditorRef = this.emailEditorRef.current;  // no parameter = return the latest ref
        if (myEditorRef && myEditorRef.editor) {
            if (this.timer) clearInterval(this.timer);
            var design = JSON.parse(this.props.template.mail_design);
            myEditorRef.editor.loadDesign(design);
            return true;
        }
        return false;
    }

    async onChangeTemplate(value) {
        await this.props.getMailTemplate(value);
        var design = JSON.parse(this.props.template.mail_design)
        if (Object.keys(design).length) {
            this.emailEditorRef.current.editor.loadDesign(design);
        } else {
            this.setState({isLoading: true});
            setTimeout(() => {
                this.setState({isLoading: false});
            }, 1000);
        }
    }

    exportHtml = () => {
        this.emailEditorRef.current.editor.exportHtml((data) => {
            const { design, html } = data;
            var updateData = {
                html_content: html,
                mail_design: JSON.stringify(design)
            }

            this.props.updateMailTemplate(this.props.template.id, updateData);
        });
    };

    render() {
        const { config, template } = this.props;
        var { isLoading } = this.state;

        return (
            <div>
                <PageTitle title="Cài đặt mẫu email" routes={routes} />
                <Card className="mb-4">
                    <Typography.Text strong>Mẫu email</Typography.Text>
                    <br />
                    <BaseSelect
                        options={config.mail_templates}
                        optionValue='id'
                        optionLabel='name'
                        style={{ width: '500px' }}
                        onChange={(value) => this.onChangeTemplate(value)}
                    />
                    {template ? <div className="mt-2">{template.description}</div> : null}
                </Card>
                {
                    !isLoading ? (
                        <div>
                            <EmailEditor
                                ref={this.emailEditorRef}
                                options={{
                                    tools: {
                                        button: { enabled: true },
                                        divider: { enabled: true },
                                        form: { enabled: true },
                                        image: { enabled: true },
                                        social: { enabled: true },
                                        text: { enabled: true },
                                        html: { enabled: true },
                                    },
                                    features: {
                                        textEditor: {
                                            tables: true
                                        }
                                    }
                                }}
                                style={{
                                    height: '600px'
                                }}
                            />
                            <Row justify="end" className="mt-4">
                                <Button type="primary" onClick={this.exportHtml}>Lưu</Button>
                            </Row>
                        </div>
                    ) : (
                        <div className="text-center">
                            <Spin size="large" />
                        </div>
                    )
                }



            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        config: state.config,
        template: state.mail.currentTemplate
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getMailTemplate: (id) => dispatch(getMailTemplate(id)),
        updateMailTemplate: (id, data) => dispatch(updateMailTemplate(id, data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MailTemplate);