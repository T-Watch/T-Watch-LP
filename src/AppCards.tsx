import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Layout, Menu, Breadcrumb, Icon, Checkbox } from 'antd';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import './App.css';
import Search from './components/Search/Search';
import ShowTargets from './components/ShowTargets/ShowTargets';
import TrainerCard from './components/TrainerCard/TrainerCard';
const { Header, Content, Footer, Sider } = Layout;
const  SubMenu  = Menu.SubMenu; 

interface AppCardsState {
  submenu: string;
  item: string;
}

class AppCards extends React.Component  <any, AppCardsState > {
  constructor(props: any) {
    super(props);
    this.state = {
        submenu: '',
        item: ''
    };
}
setSubmenu = (submenu: string) => {
  console.log(submenu);
  this.setState({
      submenu: submenu
      });
}

setItem = (item: string) => {
  this.setState({
      item: item
      });
}
handleClick = (e: any) => {
  console.log('click ', e.keyPath);
  this.setItem(e.key);
  this.setSubmenu(e.keyPath[1]);
}

  render() {
    return (
      <div>
<Layout className="layout">
    <Header>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        style={{ lineHeight: '54px' }}
      >
        <Menu.Item key="1">
         <Checkbox style={{color: 'white'}}>Running</Checkbox>
        </Menu.Item>
        <Menu.Item key="2">   
           <Checkbox style={{color: 'white'}}>Cycling</Checkbox>
        </Menu.Item>
        <Menu.Item key="3" >
        <Search  /> 
    </Menu.Item>
      </Menu>
    </Header>
    <Content style={{ padding: '0 50px' }}>

      <div style={{ background: '#fff', padding: 24, minHeight: 280 }}> 
      <ShowTargets 
        item={this.state.item} 
        submenu={this.state.submenu}
      /> {/*https://reactjs.org/docs/conditional-rendering.html*/}
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