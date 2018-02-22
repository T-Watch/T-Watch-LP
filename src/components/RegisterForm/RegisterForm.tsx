import React from 'react';
import moment from 'moment';
import { graphql } from 'react-apollo';
import { gql } from 'apollo-boost';
import './RegisterForm.css';
import {
    Form,
    Input,
    Tooltip,
    Icon,
    Select,
    Checkbox,
    Button,
    // AutoComplete,
    Radio,
    DatePicker,
    InputNumber
} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
// const AutoCompleteOption = AutoComplete.Option;
const RadioGroup = Radio.Group;
interface RegisterProps {
    confirmDirtyDefault: boolean;
    autoCompleteResultDefault: string[];
    form: any;
    mutate: Function;
}

interface RegisterState {
    confirmDirty: boolean;
    autoCompleteResult: string[];
}
function disabledDate(current: any) {
    return current && current > moment().endOf('day');
  }

class RegisterForm extends React.Component < RegisterProps& {mutate: Function},
RegisterState > {
    constructor(props: RegisterProps) {
        super(props);
        this.state = {
            confirmDirty: false,
            autoCompleteResult: []
        };
    }

    handleSubmit = (e: any) => {
        e.preventDefault();
        
        this.props.form.validateFields((err: any, values: any) => {            
            values.birthday = values.birthday.toString();
            if (!err) {
                console.log('Usuario: \n' + values);

                this.props.mutate({
                    variables: { user: values }
                });
                // console.log('Received values of form: ', values);
            }
        });
    }
    handleConfirmBlur = (e: any) => {
        const value = e.target.value;
        this.setState({
            confirmDirty: this.state.confirmDirty || !!value
        });
    }
    checkPassword = (rule: any, value: string, callback: Function) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Las contraseñas no coinciden');
        } else {
            callback();
        }
    }
    checkConfirm = (rule: any, value: string, callback: Function) => {
        const form = this.props.form;
        // Añadir más reglas, intercalo letras simbolos
        if (value.length < 6) {
            callback('La contraseña debe tener 6 o más caracteres');
        }
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    }
    checkUsername = (rule: any, value: string, callback: Function) => {
        // Comparamos con toda la base de datos
        if (value === 'mariamolgas') {
            callback('Nombre de usuario ya existente');
        } else {   
           callback();
        }
    }

    transformDate = (value: any) => {
        const birthDate: string = value.toString();
        return birthDate;
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        // const {autoCompleteResult} = this.state;

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
            <Select style={{width: 70 }}>
                <Option value="34">+34</Option>
            </Select>
        );

        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem {...formItemLayout} label="Perfil">
                    {getFieldDecorator('type', {  
                          rules: [
                            {
                                required: true,
                                message: 'Especifique un tipo de usuario'
                            }
                        ]
                    })(<RadioGroup>
                            <Radio value="USER">Deportista</Radio>
                            <Radio value="COACH">Entrenador</Radio>
                        </RadioGroup>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label={(
                    <span>
                        Usuario&nbsp;
                        <Tooltip title="Este será tu identificador en la plataforma">
                            <Icon type="question-circle-o"/>
                        </Tooltip>
                    </span>
                )}
                >
                    {getFieldDecorator('username', {
                        rules: [
                            {
                                required: true,
                                message: 'Por favor, inserta tu nombre de usuario.',
                                whitespace: true
                            }, {
                                validator: this.checkUsername
                            }
                        ]
                    })(<Input/>)}
                </FormItem>
                <FormItem {...formItemLayout} label="Contraseña">
                    {getFieldDecorator('password', {
                        rules: [
                            {
                                required: true,
                                message: 'Por favor, introduce tu contraseña.'
                            }, {
                                validator: this.checkConfirm
                            }
                        ]
                    })(<Input type="password"/>)}
                </FormItem>
                <FormItem {...formItemLayout} label="Confirma Contraseña">
                    {getFieldDecorator('confirm', {
                        rules: [
                            {
                                required: true,
                                message: 'Por favor, confirma tu contraseña.'
                            }, {
                                validator: this.checkPassword
                            }
                        ]
                    })(<Input type="password" onBlur={this.handleConfirmBlur}/>)}
                </FormItem>
                <FormItem {...formItemLayout} label="Nombre">
                    {getFieldDecorator('name', {
                        rules: [
                            {
                                required: true,
                                message: 'Por favor, introduce tu nombre.'
                            }
                        ]
                    })(<Input/>)}
                </FormItem>
                <FormItem {...formItemLayout} label="Apellidos">
                    {getFieldDecorator('lastName', {
                        rules: [
                            {
                                required: true,
                                message: 'Por favor, introduce tus apellidos.'
                            }
                        ]
                    })(<Input/>)}
                </FormItem>
                <FormItem {...formItemLayout} label="Email">
                    {getFieldDecorator('email', {
                        rules: [
                            {
                                type: 'email',
                                message: 'Email no válido'
                            }, {
                                required: true,
                                message: 'Por favor, introduce tu Email.'
                            }
                        ]
                    })(<Input/>)}
                </FormItem>
                <FormItem {...formItemLayout} label="Domicilio">
                    {getFieldDecorator('address-street-number', {
                        rules: [
                            {
                                required: true,
                                message: 'Por favor, introduce tu dirección (Calle, Número)'
                            }
                        ]
                    })(<Input/>)}
                </FormItem>
                <FormItem {...formItemLayout} label="Población">
                    {getFieldDecorator('address', {
                        rules: [
                            {
                                required: true,
                                message: 'Por favor, introduce tu población'
                            }
                        ]
                    })(<Input/>)}
                </FormItem>

                <FormItem {...formItemLayout} label="Código postal">
                    {getFieldDecorator('postal-code', {
                        rules: [
                            {
                                required: true,
                                message: 'Por favor, introduce tu código postal'
                            }
                        ]
                    })(<Input/>)}
                </FormItem>

                <FormItem {...formItemLayout} label="Teléfono">
                    {getFieldDecorator('phoneNumber', {
                        rules: [
                            {
                                required: true,
                                message: 'Por favor, introduce tu teléfono'
                            }
                        ]
                    })(<Input
                        addonBefore={prefixSelector}
                        style={{
                        width: '100%'
                    }}
                    />)}
                </FormItem>
                <FormItem {...formItemLayout} label="Sexo">
                    {getFieldDecorator('gender', {
                        rules: [
                            {
                                required: true,
                                message: 'Por favor, introduce tu sexo'
                            }
                        ]
                    })(
                        <RadioGroup>
                            <Radio value="Male">Hombre</Radio>
                            <Radio value="Female">Mujer</Radio>
                        </RadioGroup>
                    )}
                </FormItem>

                <FormItem {...formItemLayout} label="Fecha de nacimiento">
                    {getFieldDecorator('birthday', {
                        rules : [
                        {
                            type: 'object',
                            required: true,
                            message: 'Por favor, introduce tu fecha de nacimiento'
                        }, { 
                        transform: this.transformDate 
                        }
                    ]}
                )(<DatePicker 
                    disabledDate={disabledDate}
                />
                    )}
                </FormItem>

                <FormItem {...formItemLayout} label="Altura">
                    {getFieldDecorator('height', {
                                initialValue: 100
                            }
                    )(<InputNumber
                        min={0}
                        max={400}
                    />)}
                     <span className="ant-form-text"> cm</span>
                </FormItem>
                <FormItem {...formItemLayout} label="Peso">
                    {getFieldDecorator('weight', {
                                initialValue: 50
                            }
                        
                    )(<InputNumber
                        min={0}
                        max={200}
                    />)}
                     <span className="ant-form-text"> kg</span>
                </FormItem>

                {/*<FormItem {...tailFormItemLayout}>
                    {getFieldDecorator('agreement', {valuePropName: 'checked'})(
                        <Checkbox>I have read the &nbsp;
                            <a href="">agreement</a>
                        </Checkbox>
                    )}
                </FormItem>*/}
                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">Register</Button>
                </FormItem>
            </Form>
        );
    }
}

const submitRepository = gql`
mutation user($user: UserInput!){
    user(user: $user) 
}
`;

// mutación user, le paso parametro de tipo UserInput (nombre,fecha, usuario...) 
// Llamo a metodo user de la mutación para añadir nuevo usuario con el parámetro que había pasado
// export default Form.create()(RegisterForm);

export default graphql(submitRepository)(Form.create()(RegisterForm));
