import * as React from 'react';
import { Layout, } from 'antd';
const {  Footer, Content } = Layout;
import './App.css';
import PageTitle from './components/PageTitle/PageTitle';
import BackgroundImage from './components/BackgroundImage/BackgroundImage';
import Login from './components/Login/Login';
import Levels from './components/Levels/Levels';
import Separator from './components/Separator/Separator';
import WhatIs from './components/WhatIs/WhatIs';
import ContactUs from './components/ContactUs/ContactUs';

class App extends React.Component {

  render() {
    return (
      <div>
    <Layout>
        <Content style={{background: '#ffff', padding: 0, minHeight: 700 }}>
        <BackgroundImage /> 
        <PageTitle /> 
        <div className="login-component">
        <Login linkStyle={{color: '#d9d9d9'}} textStyle={{color: '#FFFFFF'}} /> 
        </div>
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
