import React from 'react'
import './WhatIs.css'
import { Col, Row } from 'antd'


export default class WhatIs extends React.Component{ //cuadro azul
    
constructor(){
    super()
}
render(){
   
    return(
        <div className="whatis">

         <Row>
         <h1 className="title"> ¿Por qué T-Watch?</h1>

            <Col className="description" span={18} > 
        <p > No podemos dejar nuestro entrenamiento en manos de patrones predefinidos ya que las características de cada persona son diferentes.
            Por ello T-Watch te ofrece la posibilidad de un entrenamiento dirigido y controlado de forma directa por un experto.
            Está pensado para deportes de cardio como running, atletismo o ciclismo.              </p>
  </Col>
  <Col span={4}>
  <img  src="/public/smartwatch.jpeg" className="imagen"/>
  </Col>

</Row>
           </div>
    )
}

}
//https://www.youtube.com/watch?v=tIajENrOJ0o