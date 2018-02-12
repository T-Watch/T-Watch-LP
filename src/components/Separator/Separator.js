import React from 'react'
import { Icon } from 'antd';
import './Separator.css'


export default class Separator extends React.Component{ //cuadro azul
    
constructor(){
    super()
}
render(){
   
    return(
        <div className="separator">
            <Icon type="down"  style={{ fontSize: 56, color: "#d9d9d9" }} />     
        </div>
    )
}

}
//https://www.youtube.com/watch?v=tIajENrOJ0o