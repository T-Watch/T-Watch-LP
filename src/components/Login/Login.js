import React from 'react'
import './Login.css';
import {Form, Icon, Input, Button, Checkbox, Modal} from 'antd';
import RegisterForm from '../RegisterForm/RegisterForm.js'

const FormItem = Form.Item;

class Login extends React.Component { //cuadro azul
  constructor() {
    super()
    this.state = {
      isActive: false
    }
  }


  handleSubmit(e) {
    e.preventDefault();
    this
      .props
      .form
      .validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
  }
  toggleModal() {
    this.setState({
      isActive: !this.state.isActive
    })
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <div>
        <Form
          onSubmit={this
          .handleSubmit
          .bind(this)}
          className="login-form">
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
                prefix={< Icon type = "user" style = {{ color: 'rgba(0,0,0,.25)' }}/>}
                placeholder="Username"/>
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
                prefix={< Icon type = "lock" style = {{ color: 'rgba(0,0,0,.25)' }}/>}
                type="password"
                placeholder="Password"/>
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true
            })(
              <Checkbox style={{
                color: '#d9d9d9'
              }}>Remember me</Checkbox>
            )}
            <a className="login-form-forgot" href="">Forgot password</a>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
           <span style={{color:'white'}}> Or </span> 
            <span style={{cursor:'pointer', color:'#d9d9d9'}} onClick={this
              .toggleModal
              .bind(this)}> register now!</span>
           

          </FormItem>
        </Form>

        <Modal
          zIndex={2}
          visible={this.state.isActive}
          onCancel={this
          .toggleModal.bind(this)}>
          <Icon
            type="arrow-left"
            style={{
            fontSize: 20
          }}
            onClick={this
            .toggleModal.bind(this)}/>

          <RegisterForm />
            </Modal>

      </div>

    );
  }
}

export default Form.create()(Login)