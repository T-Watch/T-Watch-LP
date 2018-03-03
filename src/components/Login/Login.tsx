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
import { queue } from 'async';
import { graphql } from 'react-apollo';
import { gql } from 'apollo-boost';

const FormItem = Form.Item;

interface LoginProps {
    form: any;
    cardScreen: boolean;
}
interface FullLoginProps extends LoginProps {
    token: Function;
    email: string;
    password: string;
}

interface LoginState {
    isActive: boolean;
}
class Login extends React.Component <FullLoginProps,
LoginState > {

    constructor(props: FullLoginProps) {
        super(props);
        this.state = {
            isActive: false
        };
    }

    handleSubmit = (e: any) => {
      e.preventDefault();
      this.props.form.validateFields((err: any, values: any) => {
        if (!err) {
            console.log('Usuario: \n', values);
            this.props.token({
                variables: {
                    email: values.email, 
                    password: values.password
                } 
                 
            })
            .then(({ data }: any) => {
                console.log('got data ' + data);
              }).catch((error: any) => {
                console.log('there was an error sending the query', error);
              });
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
        const cardScreen = this.props.cardScreen;
        let colorText: string;
        let colorLink: string;
        
        if (cardScreen) {
            colorText = '#000000';
            colorLink = '#005cb3';
        } else {
            colorLink = '#d9d9d9';
            colorText = '#FFFFFF';

        }
        return (
            <div>
                <Form
                    onSubmit={this.handleSubmit}
                    className="login-form"
                >
                    <FormItem>
                        {getFieldDecorator('email', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your email!'
                                }
                            ]
                        })(
                            <Input
                                prefix={< Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                                placeholder="Email"
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
                                color: colorLink
                            }}
                            >Recuerdame
                            </Checkbox>
                        )}
                        <a 
                            style={{
                            color: colorLink
                        }}
                            className="login-form-forgot" 
                            href=""
                        >Olvidé la contraseña
                        </a>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                        <span
                            style={{
                            color: colorText
                        }}
                        >
                            O si no tienes cuenta&nbsp;
                        </span>
                        <span
                            style={{
                            cursor: 'pointer',
                            color: colorLink
                        }}
                            onClick={this.toggleModal}
                        >
                        registrate!
                        </span>

                    </FormItem>
                </Form>

                <Modal zIndex={2} visible={this.state.isActive} onCancel={this.toggleModal} footer={null}>
                    <Icon
                        type="arrow-left"
                        style={{
                        fontSize: 20
                    }}
                        onClick={this.toggleModal}
                    />

                    <RegisterForm close={this.toggleModal}/>
                </Modal>

            </div>

        );
    }
}

const getToken = gql`
query Query($email: String!, $password: String!) {
	token(email: $email, password: $password){
		error
		token
	}
}
`
;

export default Form.create()(graphql<{}, FullLoginProps>(getToken)(Login as any));
