import * as React from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { Header, Content, Footer } = Layout;
import './App.css';
import Search from './components/Search/Search';
import TrainerCard from './components/TrainerCard/TrainerCard';
const  SubMenu  = Menu.SubMenu;

class AppCards extends React.Component {

  render() {
    return (
      <div>

          <Layout className="layout">
    <Header>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['Running']}
        style={{ lineHeight: '64px' }}
      >
        <SubMenu key="Running" title={<span><Icon type="mail" /><span>Running</span></span>}>
          <Menu.Item key="All">Todos</Menu.Item>
          <Menu.Item key="Vigo">Vigo</Menu.Item>
          <Menu.Item key="Ourense">Ourense</Menu.Item>
          <Menu.Item key="Lugo">Lugo</Menu.Item>
        </SubMenu>
        <SubMenu key="Cycling" title={<span><Icon type="mail" /><span>Ciclismo</span></span>}>
          <Menu.Item key="All">Todos</Menu.Item>
          <Menu.Item key="Vigo">Vigo</Menu.Item>
          <Menu.Item key="Ourense">Ourense</Menu.Item>
          <Menu.Item key="Lugo">Lugo</Menu.Item>
        </SubMenu>
        <div className="search">
        <Search />        
        </div>
      </Menu>
    </Header>
    <Content style={{ padding: '0 50px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Running</Breadcrumb.Item>
        <Breadcrumb.Item>Vigo</Breadcrumb.Item>
      </Breadcrumb>
      <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
      <TrainerCard name="María Losada" description="La mejor entrenadora del mundo mundial" photo=""/>
       <TrainerCard name="Nuria Outeiral" description="La segunda mejor entrenadora del mundo mundial" photo=""/>       
        </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>
    T-Watch ©2018 Created by mlousada
    </Footer>
  </Layout>
      </div> 
    );
  }
}
export default AppCards;