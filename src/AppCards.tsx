import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Layout, Menu, Breadcrumb, Icon, Checkbox, Select } from 'antd';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import './App.css';
import Search from './components/Search/Search';
import ShowTargets from './components/ShowTargets/ShowTargets';
import TrainerCard from './components/TrainerCard/TrainerCard';
const { Header, Content, Footer, Sider } = Layout;
const  SubMenu  = Menu.SubMenu; 
const Option = Select.Option;

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

handleAddress = (value: any) => {
  console.log(`selected ${value}`);
}

onChangeRunning = (e: any) => {
  console.log(`checked = ${e.target.checked}`);
}
onChangeCycling = (e: any) => {
  console.log(`checked = ${e.target.checked}`);
}

onSearch = (e: any) => {
  console.log(e);
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
        <Menu.Item key="running" >
         <Checkbox style={{color: 'white'}} onChange={this.onChangeRunning}>Running</Checkbox>
        </Menu.Item>
        <Menu.Item key="cycling" >   
           <Checkbox style={{color: 'white'}} onChange={this.onChangeCycling}>Cycling</Checkbox>
        </Menu.Item>
        <Menu.Item key="address" >
          <Select defaultValue="Vigo"  style={{ width: 120 }} onChange={this.handleAddress}>
            <Option value="A Coruña">A Coruña</Option>
            <Option value="Álava">Álava</Option>
            <Option value="Albacete">Albacete</Option>
            <Option value="Almería">Almería</Option>
            <Option value="Asturias">Asturias</Option>
            <Option value="Ávila">Ávila</Option>
            <Option value="Badajoz">Badajoz</Option>
            <Option value="Islas Baleares">Islas Baleares</Option>
            <Option value="Lugo">Lugo</Option>                        
            <Option value="Pontevedra">Pontevedra</Option>
            <Option value="Ourense">Ourense</Option> 
          </Select>
        </Menu.Item>
        <Menu.Item key="search" >
         <Search onSearchResult={this.onSearch} /> 
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