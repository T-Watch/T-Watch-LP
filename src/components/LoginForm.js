import React from 'react'

export default class LoginForm extends React.Component{ //cuadro azul
    
constructor(props){
    super(props)
    this.state = {
        identifier='',
        password='',
        errors = {},
        isLoading :false
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    
}
onSubmit(e){
    e.preventDefault();
}

onChange(e){
    this.setState({[e.target.name]: e.target.value})
}
render(){
    const { errors, identifier, password, isLoading } = this.state;
    
    return(
        <form>
            <h1>Login</h1>

            <TextFieldGroup 
            field="identifier"
            label="Username/Email"
            value={identifier}
            error={errors.identifier}
            onChange={this.onChange} />
            <TextFieldGroup 
            field="password"
            label="Password"
            value={password}
            error={errors.identifier}
            onChange={this.onChange} />

            <div className="form-group"> <button className="btn btn-primary btn-lg" dissabled={isLoading}></button></div>
        </form>
    );
}

}

export default LoginForm;