import * as React from 'react';
import { Layout, Row, Col } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import './App.css';
import Title from './components/Title/Title.js'
import BackgroundImage from './components/BackgroundImage/BackgroundImage.js'
import Login from './components/Login/Login.js'
import Levels from './components/Levels/Levels.js'
import Separator from './components/Separator/Separator.js'
import WhatIs from './components/WhatIs/WhatIs.js'
import ContactUs from './components/ContactUs/ContactUs.js'


class App extends React.Component {
  
  render() {
  
    const titleStyle = {
      position: "absolute",
      top: "40%",
      left: "5%"
    };

    const formStyle = {
      position: "absolute",
      top: "30%",
      right: "5%"
    };
    const imageStyle = {
      width: "100%",
      height: "50%",
    };


    return (
      <div>
    <Layout>
        <Content style={{background:'#ffff', padding: 0, minHeight: 700 }}>
        <BackgroundImage /> 
        <div style={titleStyle}><Title /> </div>
        <div style={formStyle}><Login /> </div>
        <Separator/>
        <Levels/>
        <WhatIs/>
        <ContactUs/>
        </Content>
      
      <Footer style={{ textAlign: 'center' }}>
      T-Watch ©2018 Created by mlousada
    </Footer>    
    </Layout>

  </div>
     
    );
  }
}

export default App;
