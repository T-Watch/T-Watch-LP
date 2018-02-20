import React from 'react';
import { Avatar, Row, Col } from 'antd';
import './Levels.css';

export default class Levels extends React.Component { // cuadro azul
    
render() { 
    return(
        <div className="levels">
            <Row>
                <Col className="container" span={8}> 
                     <Avatar className="center"  src="/public/basic.jpeg" size="large" />
                     <h1 className="levels-title">Basic</h1>
                     <h3 className="explanation">Seguimiento online de tu entrenamiento por parte de un experto</h3>
                </Col>
                <Col className="container" span={8}> 
                    <Avatar className="center"  src="/public/standard.jpeg" size="large" />
                    <h1 className="levels-title">Standard</h1>
                    <h3 className="explanation"> Basic + Encuentros con tu entrenador personal cada X tiempo</h3>
                </Col>
                <Col className="container" span={8}> 
                    <Avatar className="center"  src="/public/premium.jpeg" size="large" />
                    <h1 className="levels-title">Premium</h1>
                    <h3 className="explanation"> Standard + Test físico inicial para conocer
                    a fondo tus condiciones </h3>
                </Col>
            </Row>       
        </div>
    );
}

}