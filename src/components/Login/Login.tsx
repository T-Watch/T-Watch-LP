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
import { withApollo } from 'react-apollo';
import { gql } from 'apollo-boost';

const FormItem = Form.Item;

interface LoginProps {
    textStyle: any;
    linkStyle: any;
    idCoach: boolean;
}
interface ApolloProps {
    client: any;
  }

interface FullLoginProps extends LoginProps {
    form: any;
}

interface LoginState {
    isActive: boolean;
}
class Login extends React.Component <FullLoginProps & ApolloProps,
LoginState > {

    constructor(props: FullLoginProps & ApolloProps) {
        super(props);
        this.state = {
            isActive: false
        };

    }
    
    toggleModal = () => {
        this.setState({
            isActive: !this.state.isActive
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div >
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
                            <Checkbox style={this.props.linkStyle}>Recuerdame
                            </Checkbox>
                        )}
                        <a 
                            style={this.props.linkStyle}
                            className="login-form-forgot" 
                            href=""
                        >Olvidé la contraseña
                        </a>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                        <span style={this.props.textStyle}>
                            O si no tienes cuenta&nbsp;
                        </span>
                        <span 
                            className="cursor-link"
                            style={this.props.linkStyle}
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
    handleSubmit = async (e: any) => {
        e.preventDefault();
        this.props.form.validateFields((err: any, values: any) => {
          if (!err) {
            this.submit(
              values,
              (s: string) => {
                this.props.form.setFields({
                  email: {
                    value: values.email,
                    errors: [new Error(s)],
                  },
                  password: {
                    value: values.password,
                    errors: [new Error(s)],
                  },
                });
              });
          }
        });
    }
      
        submit = async (args: any, onError: Function) => {
            try {
                const { data } = await this.props.client.query({
                    query: gql`query Query($email: String!, $password: String!) {
                          token(email: $email, password: $password){
                            error
                            token
                          }
                        }`,
                    variables: args
                  });
        
                if (data.token.error) {
                    throw new Error(data.token.error);
              }
                console.log(data.token.token);
                localStorage.setItem('token', data.token.token);
                localStorage.setItem('email', args.email);
                console.log('ENTRA: ' + this.props.idCoach);
                
                if (this.props.idCoach !== undefined) {
                console.log('ENTRA: ' + this.props.idCoach);
                window.location.href =
                'http://localhost:3000?email=' + args.email + '&type=COACH&token=' + data.token.token;
                } else {
                    window.location.href =
                    'http://localhost:3000?token=' + data.token.token;
                }
            } catch (e) {
              onError(e.message);
            }
          }
}

const GET_TOKEN = gql`
query Query($email: String!, $password: String!) {
	token(email: $email, password: $password){
		error
		token
	}
}
`
;

// export default Form.create()(graphql<{}, FullLoginProps>(GET_TOKEN, {name : 'getToken'})(Login as any));

export default Form.create()(withApollo<FullLoginProps, {}>(Login as any));