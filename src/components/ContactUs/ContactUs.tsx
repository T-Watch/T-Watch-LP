import React from 'react';
import './ContactUs.css';
import { Button, Modal, Icon } from 'antd';

interface ContactUsState {
    isActive: boolean;
}
export default class ContactUs extends React.Component<any,
ContactUsState> {

    constructor(props: any) {
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
        return (
            <div className="container-contact">
                <br/>
                <br/>
                <h1 className="title-contact">Contacta con nosotros</h1>
                <h6>Si necesitas más información o algo no te queda claro no dudes en ponerte en
                    contacto con nosotros</h6>
                <Button className="contactus" type="primary" size="large" onClick={this.toggleModal}>Háblanos</Button>

                     <Modal zIndex={2} visible={this.state.isActive} onCancel={this.toggleModal} footer={null}>
                    <Icon
                        type="arrow-left"
                        style={{
                        fontSize: 20
                    }}
                        onClick={this.toggleModal}
                    />
                    <div style={{textAlign: 'center'}}>
                    <Icon type="mail" style={{fontSize: 16}} /> 
                    <a href="https://mail.google.com/mail/?view=cm&fs=1&to=twatchoficial@gmail.com&su=Info&body=Escribenos" 
                       style={{fontSize: 16, color: '#005cb3'}} 
                       target="_blank"
                    >twatchoficial@gmail.com
                    </a>
                    <br/>
                    <br/>
                    <Icon type="twitter" style={{fontSize: 16}}/> 
                    <a 
                       style={{fontSize: 16, color: '#005cb3'}} 
                       href="https://twitter.com/twatchoficial" 
                       target="_blank"
                    >@twatchoficial
                    </a>
                    <br/>
                    <br/>
                    <img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTI7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4Ij4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNMzUyLDBIMTYwQzcxLjY0OCwwLDAsNzEuNjQ4LDAsMTYwdjE5MmMwLDg4LjM1Miw3MS42NDgsMTYwLDE2MCwxNjBoMTkyYzg4LjM1MiwwLDE2MC03MS42NDgsMTYwLTE2MFYxNjAgICAgQzUxMiw3MS42NDgsNDQwLjM1MiwwLDM1MiwweiBNNDY0LDM1MmMwLDYxLjc2LTUwLjI0LDExMi0xMTIsMTEySDE2MGMtNjEuNzYsMC0xMTItNTAuMjQtMTEyLTExMlYxNjBDNDgsOTguMjQsOTguMjQsNDgsMTYwLDQ4ICAgIGgxOTJjNjEuNzYsMCwxMTIsNTAuMjQsMTEyLDExMlYzNTJ6IiBmaWxsPSIjMDAwMDAwIi8+Cgk8L2c+CjwvZz4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNMjU2LDEyOGMtNzAuNjg4LDAtMTI4LDU3LjMxMi0xMjgsMTI4czU3LjMxMiwxMjgsMTI4LDEyOHMxMjgtNTcuMzEyLDEyOC0xMjhTMzI2LjY4OCwxMjgsMjU2LDEyOHogTTI1NiwzMzYgICAgYy00NC4wOTYsMC04MC0zNS45MDQtODAtODBjMC00NC4xMjgsMzUuOTA0LTgwLDgwLTgwczgwLDM1Ljg3Miw4MCw4MEMzMzYsMzAwLjA5NiwzMDAuMDk2LDMzNiwyNTYsMzM2eiIgZmlsbD0iIzAwMDAwMCIvPgoJPC9nPgo8L2c+CjxnPgoJPGc+CgkJPGNpcmNsZSBjeD0iMzkzLjYiIGN5PSIxMTguNCIgcj0iMTcuMDU2IiBmaWxsPSIjMDAwMDAwIi8+Cgk8L2c+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==" />                  
                    <a 
                       style={{fontSize: 16, color: '#005cb3'}} 
                       href="https://www.instagram.com/twatchoficial" 
                       target="_blank"
                    >@twatchoficial
                    </a>
                    <br/>
                    <br/>
                    <Icon type="facebook" style={{fontSize: 16}}/>
                    <a 
                       style={{fontSize: 16, color: '#005cb3'}} 
                       href="https://www.instagram.com/twatchoficial" 
                       target="_blank"
                    >@twatchoficial
                    </a>
                    </div>
                </Modal>
                <br/>
                <br/>
            </div>
        );
    }

}
// https://ciunkos.com/creating-contact-forms-with-nodemailer-and-react
// https://console.cloud.google.com/getting-started?ignorePreviousPage&pli=1