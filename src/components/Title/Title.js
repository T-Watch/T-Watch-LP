import React from 'react'
import { Row, Col } from 'antd';
import './Title.css';


export default class BackgroundImage extends React.Component{ //cuadro azul

constructor(){
    super()
}
render(){
   
    return(
        <div >
        <h1 className="tit">T-Watch</h1>
        <h2 className="tit"> <i> Mucho más que un entrenador personal</i></h2>

        </div>
    
    )
}

}
