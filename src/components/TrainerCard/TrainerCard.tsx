import React from 'react';
import { Card, Modal, Icon } from 'antd';
import './TrainerCard.css';
import Login from '../Login/Login';

interface TrainerCardProps {
    name: string;
    description: string;
    photo: string;
}

interface TrainerCardState {
    name: string;
    description: string;
    photo: string;
    isActive: boolean;
}
export default class TrainerCard extends React.Component <TrainerCardProps, TrainerCardState > {
    constructor(props: TrainerCardProps) {
        super(props);
        this.state = {
            name: this.props.name,
            description: this.props.description,
            photo: this.props.photo,
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
                    title={this.state.name} 
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
                </Card>
                <Modal 
                    title="Para poder consultar toda la información inicia sesión" 
                    zIndex={2} 
                    visible={this.state.isActive} 
                    onCancel={this.toggleModal} 
                    footer={null}
                >
                    <Login/>
                </Modal>
            </div>
        );
    }

}