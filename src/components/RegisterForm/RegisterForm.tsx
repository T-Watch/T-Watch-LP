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
const CheckboxGroup = Checkbox.Group;
const optionsUSER = [
    { label: 'Usuario', value: 'USER' },
    { label: 'Entrenador', value: 'COACH' }
  ];
const optionsSpecialities = [
    { label: 'Cycling', value: 'Cycling' },
    { label: 'Running', value: 'Running' } // añadir "OTRO"
  ];
const province = (
    <Select defaultValue="Pontevedra">
      <Option value="A Coruña">A Coruña</Option>
      <Option value="Álava">Álava</Option>
      <Option value="Albacete">Albacete</Option>
      <Option value="Almería">Almería</Option>
      <Option value="Asturias">Asturias</Option>
      <Option value="Ávila">Ávila</Option>
      <Option value="Badajoz">Badajoz</Option>
      <Option value="Islas Baleares">Islas Baleares</Option>
    </Select>
);
interface RegisterProps {
    close: Function;
}
interface FullRegisterProps extends RegisterProps {
    form: any;
    mutate: Function;
}
let USER = {
    nombre: 'name'
};

let COACH = {
    nombre: 'name'
};

interface RegisterState {
    confirmDirty: boolean;
    autoCompleteResult: string[];
    close: Function;
    user: boolean;
}
function disabledDate(current: any) {
    return current && current > moment().endOf('day');
}

class RegisterForm extends React.Component<FullRegisterProps,
    RegisterState> {
    constructor(props: FullRegisterProps) {
        super(props);
        this.state = {
            confirmDirty: false,
            autoCompleteResult: [],
            close: this.props.close,
            user: true
        };
    }
  
    handleSubmit = (e: any) => {
        e.preventDefault();

        this.props.form.validateFields((err: any, values: any) => {
            values.birthday = values.birthday.toString();
            delete values.confirm;
            if (!err) {
                console.log('Usuario: \n', values);
                this.props.mutate({
                    variables: { user: values }
                })
                .then(({ data }: any) => {
                    console.log('got data');
                  }).catch((error: any) => {
                    console.log('there was an error sending the query', error);
                  });
                this.state.close();
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
            form.validateFields(['confirm'], { force: true });
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

    isUser = (e: any) => {
        if (e.target.value === 'USER') {
            this.setState({
                user: true
            }); 
        } else if (e.target.value === 'COACH') {
            this.setState({
                user: false
            }); 
        }
          
    }
    /*transformDate = (value: any) => {
        const birthDate: string = value.toString();
        return birthDate;
    }*/

    render() {
        const { getFieldDecorator } = this.props.form;
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

        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem {...formItemLayout} label="Perfil">
                    {getFieldDecorator('type', {
                        initialValue: 'USER',
                        rules: [
                            {
                                required: true,
                                message: 'Especifique un tipo de usuario'
                            }
                        ]
                    })(<RadioGroup options={optionsUSER} onChange={this.isUser}/>)}
                </FormItem>
                {/*<FormItem
                    {...formItemLayout}
                    label={(
                        <span>
                            Usuario&nbsp;
                        <Tooltip title="Este será tu identificador en la plataforma">
                                <Icon type="question-circle-o" />
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
                    })(<Input />)}
                </FormItem>*/}
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
                    })(<Input type="password" />)}
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
                    })(<Input type="password" onBlur={this.handleConfirmBlur} />)}
                </FormItem>
                <FormItem {...formItemLayout} label="Nombre">
                    {getFieldDecorator('name', {
                        rules: [
                            {
                                required: true,
                                message: 'Por favor, introduce tu nombre.'
                            }
                        ]
                    })(<Input />)}
                </FormItem>
                <FormItem {...formItemLayout} label="Apellidos">
                    {getFieldDecorator('lastName', {
                        rules: [
                            {
                                required: true,
                                message: 'Por favor, introduce tus apellidos.'
                            }
                        ]
                    })(<Input />)}
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
                    })(<Input />)}
                </FormItem>
                {/*<FormItem {...formItemLayout} label="Domicilio">
                    {getFieldDecorator('address-street-number', {
                        rules: [
                            {
                                required: true,
                                message: 'Por favor, introduce tu dirección (Calle, Número)'
                            }
                        ]
                    })(<Input />)}
                </FormItem>*/}
                <FormItem {...formItemLayout} label="Provincia">
                    {getFieldDecorator('address', {
                        initialValue: 'Pontevedra',
                        rules: [
                            {
                                required: true,
                            }
                        ]
                    })(   
                    <Select>
                        <Option value="A Coruña">A Coruña</Option>
                        <Option value="Álava">Álava</Option>
                        <Option value="Albacete">Albacete</Option>
                        <Option value="Almería">Almería</Option>
                        <Option value="Asturias">Asturias</Option>
                        <Option value="Ávila">Ávila</Option>
                        <Option value="Badajoz">Badajoz</Option>
                        <Option value="Islas Baleares">Islas Baleares</Option>
                        <Option value="Lugo">Lugo</Option>                        
                        <Option value="Pontevedra">Pontevedra</Option>
                        <Option value="Ourense">Ourense</Option> 
                  </Select>)}
                </FormItem>

               {/* <FormItem {...formItemLayout} label="Código postal">
                    {getFieldDecorator('postal-code', {
                        rules: [
                            {
                                required: true,
                                message: 'Por favor, introduce tu código postal'
                            }
                        ]
                    })(<Input />)}
                </FormItem>*/}

                <FormItem {...formItemLayout} label="Teléfono">
                    {getFieldDecorator('phoneNumber', {
                        rules: [
                            {
                                required: true,
                                message: 'Por favor, introduce tu teléfono'
                            }
                        ]
                    })(<Input
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
                            <Radio value="M">Hombre</Radio>
                            <Radio value="F">Mujer</Radio>
                        </RadioGroup>
                    )}
                </FormItem>

                <FormItem {...formItemLayout} label="Fecha de nacimiento">
                    {getFieldDecorator('birthday', {
                        rules: [
                            {
                                type: 'object',
                                required: true,
                                message: 'Por favor, introduce tu fecha de nacimiento'
                            }
                        ]
                    }
                    )(<DatePicker
                        disabledDate={disabledDate}
                    />
                    )}
                </FormItem>
        {this.state.user ? 
            <div>
                <FormItem {...formItemLayout} label="Altura">
            {getFieldDecorator('height', {
                initialValue: 100,
                rules: [
                    {
                        required: true,
                    }
                ]
            }
            )(<InputNumber
                min={0}
                max={400}
            />)}
            <span className="ant-form-text"> cm</span>
            </FormItem> 
            <FormItem {...formItemLayout} label="Peso">
            {getFieldDecorator('weight', {
                initialValue: 50,
                rules: [
                    {
                        required: true,
                    }
                ]
            }

            )(<InputNumber
                min={0}
                max={200}
            />)}
            <span className="ant-form-text"> kg</span>
            </FormItem> 
            <FormItem {...formItemLayout} label="Enfermedades">
                    {getFieldDecorator('diseases', {
                        rules: [
                            {
                                message: 'Por favor, haznos saber si tienes alguna enfermedad.'
                            }
                        ]
                    })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label="Alergias">
                    {getFieldDecorator('allergies', {
                        rules: [
                            {
                                message: 'Por favor, haznos saber si tienes alguna alergias.'
                            }
                        ]
                    })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label="Operaciones">
                    {getFieldDecorator('surgeries', {
                        rules: [
                            {
                                message: 'Por favor, haznos saber si tienes alguna alergias.'
                            }
                        ]
                    })(<Input />)}
            </FormItem>

            <FormItem {...formItemLayout} label="Plan de suscripción">
                    {getFieldDecorator('plan', {
                        rules: [
                            {
                                required: true,
                                message: 'Por favor, introduce el plan al que se va a suscribir'
                            }
                        ]
                    })(
                        <RadioGroup>
                            <Radio value="Basic">Basic&nbsp;
                            <Tooltip title="Entrenamiento online">
                              <Icon type="question-circle-o" />
                            </Tooltip>
                          </Radio>
                          <br/>
                            <Radio value="Standard">Standard&nbsp;
                            <Tooltip title="Basic + quedadas con tu entrenador">
                              <Icon type="question-circle-o" />
                            </Tooltip>
                          </Radio>    
                          <br/>                                                  
                            <Radio value="Premium">Premium&nbsp;
                            <Tooltip title="Standard + test físico inicial en un centro cercano al usuario">
                              <Icon type="question-circle-o" />
                            </Tooltip>
                          </Radio>  
                        </RadioGroup>
                    )}
                </FormItem>

        </div>
        : 
        {/*<div>
          <FormItem {...formItemLayout} label="Especialidad">
                    {getFieldDecorator('specialities', {
                        initialValue: ['Running'],
                        rules: [{
                            required: true
                        }]
                        
                    })(    <CheckboxGroup options={optionsSpecialities} />
                )}
            </FormItem>
            </div>*/}    }       
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
mutation Mutation($user: UserInput!){
    user(input: $user) 
}
`;

// mutación user, le paso parametro de tipo UserInput (nombre,fecha, usuario...) 
// Llamo a metodo user de la mutación para añadir nuevo usuario con el parámetro que había pasado
// export default Form.create()(RegisterForm);

export default Form.create()(graphql<{}, FullRegisterProps>(submitRepository)(RegisterForm as any));
