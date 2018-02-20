import React from 'react';
import './ContactUs.css';
import { Button } from 'antd';

export default class ContactUs extends React.Component {

    render() {

        return (
            <div className="container-contact">
                <br/>
                <br/>
                <h1 className="title-contact">Contacta con nosotros</h1>
                <h6>Si necesitas más información o algo no te queda claro no dudes en ponerte en
                    contacto con nosotros</h6>
                <Button className="contactus" type="primary" size="large">Háblanos</Button>
                <br/>
                <br/>
            </div>
        );
    }

}
