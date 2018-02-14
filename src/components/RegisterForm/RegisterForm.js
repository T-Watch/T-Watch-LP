import React from 'react'
import './RegisterForm.css';
import {
    Form,
    Input,
    Tooltip,
    Icon,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    AutoComplete
} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

const residences = [
    {
        value: 'maceda',
        label: 'Maceda',
        children: [
            {
                value: 'ourense',
                label: 'Ourense',
                children: [
                    {
                        value: 'espana',
                        label: 'España'
                    }
                ]
            }
        ]
    }
];

class RegisterForm extends React.Component {
    constructor() {
        super()
        this.state = {
            confirmDirty: false,
            autoCompleteResult: []
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        this
            .props
            .form
            .validateFieldsAndScroll((err, values) => {
                if (!err) {
                    console.log('Received values of form: ', values);
                }
            });
    }
    handleConfirmBlur(e) {
        const value = e.target.value;
        this.setState({
            confirmDirty: this.state.confirmDirty || !!value
        });
    }
    checkPassword(rule, value, callback) {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }
    checkConfirm(rule, value, callback) {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    }

    handleWebsiteChange(value) {
        let autoCompleteResult;
        if (!value) {
            autoCompleteResult = [];
        } else {
            autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
        }
        this.setState({autoCompleteResult});
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const {autoCompleteResult} = this.state;

        const formItemLayout = {
            labelCol: {
                xs: {
                    span: 24
                },
                sm: {
                    span: 8
                }
            },
            wrapperCol: {
                xs: {
                    span: 24
                },
                sm: {
                    span: 16
                }
            }
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0
                },
                sm: {
                    span: 16,
                    offset: 8
                }
            }
        };
        const prefixSelector = getFieldDecorator('prefix', {initialValue: '34'})(
            <Select style={{
                width: 70
            }}>
                <Option value="34">+34</Option>
            </Select>
        );

        const websiteOptions = autoCompleteResult.map(website => (
            <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
        ));

        return (
            <Form onSubmit={this
                .handleSubmit
                .bind(this)}>
                <FormItem {...formItemLayout} label="E-mail">
                    {getFieldDecorator('email', {
                        rules: [
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!'
                            }, {
                                required: true,
                                message: 'Please input your E-mail!'
                            }
                        ]
                    })(<Input/>)}
                </FormItem>
                <FormItem {...formItemLayout} label="Contraseña">
                    {getFieldDecorator('password', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input your password!'
                            }, {
                                validator: this
                                    .checkConfirm
                                    .bind(this)
                            }
                        ]
                    })(<Input type="password"/>)}
                </FormItem>
                <FormItem {...formItemLayout} label="Confirma Contraseña">
                    {getFieldDecorator('confirm', {
                        rules: [
                            {
                                required: true,
                                message: 'Please confirm your password!'
                            }, {
                                validator: this
                                    .checkPassword
                                    .bind(this)
                            }
                        ]
                    })(<Input
                        type="password"
                        onBlur={this
                        .handleConfirmBlur
                        .bind(this)}/>)}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label={(
                    <span>
                        Username&nbsp;
                        <Tooltip title="What do you want others to call you?">
                            <Icon type="question-circle-o"/>
                        </Tooltip>
                    </span>
                )}>
                    {getFieldDecorator('nickname', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input your nickname!',
                                whitespace: true
                            }
                        ]
                    })(<Input/>)}
                </FormItem>
                <FormItem {...formItemLayout} label="Domicilio">
                    {getFieldDecorator('residence', {
                        rules: [
                            {
                                required: true,
                                message: 'Calle, Número',
                                whitespace: true
                            }
                        ]
                    })(<Input/>)}
                </FormItem>

                <FormItem {...formItemLayout} label="Código postal">
                    {getFieldDecorator('residence', {
                        rules: [
                            {
                                required: true,
                                message: 'Calle, Número',
                                whitespace: true
                            }
                        ]
                    })(<Input/>)}
                </FormItem>

                <FormItem {...formItemLayout} label="Teléfono">
                    {getFieldDecorator('phone', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input your phone number!'
                            }
                        ]
                    })(<Input
                        addonBefore={prefixSelector}
                        style={{
                        width: '100%'
                    }}/>)}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Captcha"
                    extra="We must make sure that your are a human.">
                    <Row gutter={8}>
                        <Col span={12}>
                            {getFieldDecorator('captcha', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please input the captcha you got!'
                                    }
                                ]
                            })(<Input/>)}
                        </Col>
                        <Col span={12}>
                            <Button>Get captcha</Button>
                        </Col>
                    </Row>
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    {getFieldDecorator('agreement', {valuePropName: 'checked'})(
                        <Checkbox>I have read the
                            <a href="">agreement</a>
                        </Checkbox>
                    )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">Register</Button>
                </FormItem>
            </Form>
        );
    }
}

export default Form.create()(RegisterForm);