import React from 'react';
import moment from 'moment';
import { graphql } from 'react-apollo';
import { gql } from 'apollo-boost';
import './SendEmail.css';
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

interface RegisterState {
    confirmDirty: boolean;
    autoCompleteResult: string[];
    close: Function;
    user: boolean;
}
function disabledDate(current: any) {
    return current && current > moment().endOf('day');
}

class SendEmail extends React.Component<FullRegisterProps,
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
            <div>
            <h2> Envíanos un correo</h2>
            <Form onSubmit={this.handleSubmit}>
    
                <FormItem {...formItemLayout} label="Asunto">
                    {getFieldDecorator('asunto', {
                        rules: [
                            {
                                required: true,
                                message: 'Por favor, indicanos de que nos quieres hablar.'
                            }
                        ]
                    })(<Input />)}
                </FormItem>
                {/*<FormItem {...formItemLayout} label="Email">
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
                </FormItem>*/}
            
            <FormItem {...formItemLayout} label="Mensaje">
                    {getFieldDecorator('message', {
                        rules: [
                            {
                                required: true,
                                message: 'Por favor, dinos todo lo que necesites.'
                            }
                        ]
                    })(<Input />)}
            </FormItem>
       
                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">Send</Button>
                </FormItem>
            </Form>
            </div>
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

export default Form.create()(graphql<{}, FullRegisterProps>(submitRepository)(SendEmail as any));
