import * as React from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { Header, Content, Footer } = Layout;
import './App.css';
import Search from './components/Search/Search';
import TrainerCard from './components/TrainerCard/TrainerCard';
const  SubMenu  = Menu.SubMenu;

interface AppCardsState {
  Vigo: boolean;
  submenu: string;
  item: string;
}

const VigoRunningCoaches =  (
  <div>
    <TrainerCard 
      name="Raul Iglesias" 
      description="El mejor entrenador del mundo mundial" 
      photo="" 
      location="Vigo"
      type="Running"
    />
     </div>
);

const VigoCyclingCoaches =  (
  <div>
    <TrainerCard 
      name="Brais Piñeiro" 
      description="El mejor entrenador del mundo mundial" 
      photo="" 
      location="Vigo"
      type="Running"
    />
     </div>
);

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
  <div>
    <TrainerCard 
      name="Nuria Outeiral" 
      description="El mejor entrenador del mundo mundial" 
      photo="" 
      location="Vigo"
      type="Running"
    />
     </div>
);

const LugoCyclingCoaches =  (
  <div>
    <TrainerCard 
      name="Martin Paz" 
      description="El mejor entrenador del mundo mundial" 
      photo="" 
      location="Vigo"
      type="Running"
    />
     </div>
);

const runners = [VigoRunningCoaches, OurenseRunningCoaches];
const cyclists = [LugoCyclingCoaches, OurenseCyclingCoaches, VigoCyclingCoaches];
const coaches = [runners, cyclists];
function ShowTargets(props: any) {
  const item = props.item;
  const submenu = props.submenu;
  console.log('show' + item);
  if (submenu === 'Running') {
    if (item === 'Vigo') {
    return (VigoRunningCoaches);
    } else if (item === 'Ourense') {
      return (OurenseRunningCoaches);
    } else {
      return runners;
   }
  } else if (submenu === 'Cycling') {
    if (item === 'Vigo') {
      return (VigoCyclingCoaches);
      } else if (item === 'Ourense') {
        return (OurenseCyclingCoaches);
      } else if (item === 'Lugo') {
       return LugoCyclingCoaches;
      } else {
        return cyclists;
     }  } else {
   return coaches;
}
}
class AppCards extends React.Component  <any, AppCardsState > {
  constructor(props: any) {
    super(props);
    this.state = {
        Vigo: false,
        submenu: '',
        item: ''
    };
}

searchVigo = () => {
  console.log('Entra');
  
  this.setState({
      Vigo: !this.state.Vigo
  });
}
setSubmenu = (submenu: string) => {
  console.log(submenu);
  this.setState({
      submenu: submenu
      });
}

setItem = (item: string) => {
  console.log('bvigo');
  this.setState({
      item: item
      });
}
handleClick = (e: any) => {
  console.log('click ', e.keyPath);
  this.setItem(e.key);
  this.setSubmenu(e.keyPath[1]);

  if (e.key === 'Vigo') {
    this.searchVigo();
    
  }
 
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
      <ShowTargets item={this.state.item} submenu={this.state.submenu}/> {/*https://reactjs.org/docs/conditional-rendering.html*/}
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