import React from 'react';
import './ContactUs.css';
import { Button, Modal, Icon } from 'antd';
import SendEmail from '../SendEmail/SendEmail';

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

                    <SendEmail close={this.toggleModal}/>
                </Modal>
                <br/>
                <br/>
            </div>
        );
    }

}
// https://ciunkos.com/creating-contact-forms-with-nodemailer-and-react
// https://console.cloud.google.com/getting-started?ignorePreviousPage&pli=1