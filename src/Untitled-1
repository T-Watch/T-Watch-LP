import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import './App.css';
import Search from './components/Search/Search';
import ShowTargets from './components/ShowTargets/ShowTargets';
import TrainerCard from './components/TrainerCard/TrainerCard';
const { Header, Content, Footer } = Layout;
const  SubMenu  = Menu.SubMenu; 

interface AppCardsState {
  submenu: string;
  item: string;
}

// VIGO

const VigoRunningCoaches =  (
    <TrainerCard 
      name="Raul Iglesias" 
      description="El mejor entrenador del mundo mundial" 
      photo="" 
      location="Vigo"
      type="Running"
    />
     
);

const VigoCyclingCoaches =  (
    <TrainerCard 
      name="Brais Piñeiro" 
      description="El mejor entrenador del mundo mundial" 
      photo="" 
      location="Vigo"
      type="Running"
    />
);

// OURENSE

const OurenseRunningCoaches =  (
  <div>
     <TrainerCard 
      name="Hector González" 
      description="La mejor entrenadora del mundo mundial" 
      photo="" 
      location="Ourense"
      type="Running"
     />
    <TrainerCard 
      name="Maria Losada" 
      description="La mejor entrenadora del mundo mundial" 
      photo="" 
      location="Ourense"
      type="Running"
    />
  </div>  
);

const OurenseCyclingCoaches =  (
    <TrainerCard 
      name="Nuria Outeiral" 
      description="El mejor entrenador del mundo mundial" 
      photo="" 
      location="Vigo"
      type="Running"
    />
);

// LUGO
const LugoRunningCoaches =  (
  <TrainerCard 
      name="Martin Paz" 
      description="El mejor entrenador del mundo mundial" 
      photo="" 
      location="Vigo"
      type="Running"
  />
);

const LugoCyclingCoaches =  (
    <TrainerCard 
      name="Martin Paz" 
      description="El mejor entrenador del mundo mundial" 
      photo="" 
      location="Vigo"
      type="Running"
    />
);

const runners = [VigoRunningCoaches, OurenseRunningCoaches];
const cyclists = [LugoCyclingCoaches, OurenseCyclingCoaches, VigoCyclingCoaches];
const coaches = [runners, cyclists];

/*function ShowTargets(props: any) {
  const item = props.item;
  const submenu = props.submenu;
  console.log('submenu ' + submenu + ' item ' + item);
  if (submenu === 'Running') {
    if (item === 'Vigo') {
    console.log('Vigo Running');
    return (VigoRunningCoaches);
    } else if (item === 'Ourense') {
      console.log('Ourense Running');
      return (OurenseRunningCoaches);
    } else if (item === 'Lugo') {
      console.log('Lugo Running');
      return (LugoRunningCoaches);
    } else {
      return runners;
   }
  } else if (submenu === 'Cycling') {
    if (item === 'Vigo') {
      console.log('Vigo Cycling');
      return (VigoCyclingCoaches);
      } else if (item === 'Ourense') {
        console.log('Ourense Cycling');  
        return (OurenseCyclingCoaches);
      } else if (item === 'Lugo') {
      console.log('Lugo Cycling');
      return LugoCyclingCoaches;
      } else {
        return cyclists;
     }  
  } else {
   return coaches;
  }
}*/
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
        defaultSelectedKeys={['Running']}
        style={{ lineHeight: '64px' }}
        onClick={this.handleClick}
      >
          <Menu.Item key="back">
            <Icon type="arrow-left" />
        </Menu.Item>        
        <SubMenu  
          key="Running" 
          title={<span><Icon type="mail" />
          <span>Running</span></span>}
        >
          <Menu.Item key="All">Todos</Menu.Item>
          <Menu.Item key="Vigo">Vigo</Menu.Item>
          <Menu.Item key="Ourense">Ourense</Menu.Item>
          <Menu.Item key="Lugo">Lugo</Menu.Item>
        </SubMenu>
        <SubMenu 
          key="Cycling" 
          title={<span><Icon type="mail" /><span>Ciclismo</span></span>}
        >
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
        <Breadcrumb.Item>{this.state.submenu}</Breadcrumb.Item>
        <Breadcrumb.Item>{this.state.item}</Breadcrumb.Item>
      </Breadcrumb>

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