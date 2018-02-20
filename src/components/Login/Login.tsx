import React from 'react';
import './Login.css';
import {
    Form,
    Icon,
    Input,
    Button,
    Checkbox,
    Modal
} from 'antd';
import RegisterForm from '../RegisterForm/RegisterForm';

const FormItem = Form.Item;

interface LoginProps {
    isActiveDefault: boolean;
    form: any;
}

interface LoginState {
    isActive: boolean;
}
class Login extends React.Component <LoginProps,
LoginState > {

    constructor(props: LoginProps) {
        super(props);
        this.state = {
            isActive: this.props.isActiveDefault
        };
    }

    handleSubmit = (e: any) => {
      e.preventDefault();
      this.props.form.validateFields((err: any, values: any) => {
          if (!err) {
            // console.log('Received values of form: ', values);
          }
        });
    }
    toggleModal = () => {
        this.setState({
            isActive: !this.state.isActive
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div className="login-component">
                <Form
                    onSubmit={this.handleSubmit}
                    className="login-form"
                >
                    <FormItem>
                        {getFieldDecorator('userName', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your username!'
                                }
                            ]
                        })(
                            <Input
                                prefix={< Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                                placeholder="Username"
                            />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your Password!'
                                }
                            ]
                        })(
                            <Input
                                prefix={< Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                                type="password"
                                placeholder="Password"
                            />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true
                        })(
                            <Checkbox
                                style={{
                                color: '#d9d9d9'
                            }}
                            >Remember me
                            </Checkbox>
                        )}
                        <a className="login-form-forgot" href="">Forgot password</a>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                        <span
                            style={{
                            color: 'white'
                        }}
                        >
                            Or&nbsp;
                        </span>
                        <span
                            style={{
                            cursor: 'pointer',
                            color: '#d9d9d9'
                        }}
                            onClick={this.toggleModal}
                        >
                        register now!
                        </span>

                    </FormItem>
                </Form>

                <Modal zIndex={2} visible={this.state.isActive} onCancel={this.toggleModal}>
                    <Icon
                        type="arrow-left"
                        style={{
                        fontSize: 20
                    }}
                        onClick={this.toggleModal}
                    />

                    <RegisterForm confirmDirtyDefault={false} autoCompleteResultDefault={[]}/>
                </Modal>

            </div>

        );
    }
}

export default Form.create()(Login);