import React from 'react'
import { Row, Col } from 'antd';
import './components.css';


export default class BackgroundImage extends React.Component{ //cuadro azul

constructor(){
    super()
}
render(){
   
    const color = {
        color: "#FFFFFF"
    }
    return(
        <div >
        <h1 className="title">T-Watch</h1>
        <h2 className="title"> <i> Mucho más que un entrenador personal</i></h2>

        </div>
    
    )
}

}
