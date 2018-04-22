import React from 'react';
import { Card, Modal, Icon } from 'antd';
import './CoachCard.css';
import Login from '../Login/Login';

interface CoachCardProps {
    name: string;
    lastName: string;
    description: string;
    photo: string;
    location: string;
    type: string;  
    email: string;  
    fields: string[];    
}

interface CoachCardState {
    name: string;
    lastName: string;
    description: string;
    photo: string;
    isActive: boolean;
    location: string;
    type: string;
    email: string;
    fields: string[];
}
export default class CoachCard extends React.Component <CoachCardProps, CoachCardState > {
    constructor(props: CoachCardProps) {
        super(props);
        this.state = {
            email: this.props.email,
            name: this.props.name,
            lastName: this.props.lastName,
            description: this.props.description,
            photo: this.props.photo,
            location: this.props.location,
            type: this.props.type,
            fields: this.props.fields,
            isActive: false
        };
    }
    toggleModal = () => {
        this.setState({
            isActive: !this.state.isActive
        });
    }
    render() {
        return (
            <div className="card">
                <Card 
                    title={this.state.name + ' ' + this.state.lastName} 
                    style={{ width: 300 }} 
                    extra={<span  
                            style={{
                            cursor: 'pointer',
                            color: 'black'
                            }} 
                            onClick={this.toggleModal}
                    > More 
                    </span>}
                >
                
                    <p>{this.state.description}</p>
                    <p>Especialidades: {this.state.fields.toString()}</p>
                </Card>
                <Modal 
                    title="Para poder consultar toda la información inicia sesión" 
                    zIndex={2} 
                    visible={this.state.isActive} 
                    onCancel={this.toggleModal} 
                    footer={null}
                    className="modal-login"
                >
                  <Login linkStyle={{color: '#005cb3'}} textStyle={{color: '#000000'}} idCoach={this.props.email} /> 
                </Modal>
            </div>
        );
    }

}