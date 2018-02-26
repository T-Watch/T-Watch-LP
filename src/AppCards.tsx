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
function ShowTargets(props: any) {
  const item = props.item;
  if (item === 'Vigo') {
    return <TrainerCard name="María Losada" 
    description="La mejor entrenadora del mundo mundial" photo="" location="Vigo"/>;

  }
  else{
  return <GuestGreeting />;
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
  console.log('running');
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
          onTitleClick={this.setSubmenu('Running')}
        >
          <Menu.Item key="All">Todos</Menu.Item>
          <Menu.Item key="Vigo">Vigo</Menu.Item>
          <Menu.Item key="Ourense">Ourense</Menu.Item>
          <Menu.Item key="Lugo">Lugo</Menu.Item>
        </SubMenu>
        <SubMenu 
          key="Cycling" 
          title={<span><Icon type="mail" /><span>Ciclismo</span></span>}
          onTitleClick={this.setSubmenu('Cycling')}
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
   {
     this.state.Vigo ?
     <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
     <TrainerCard name="María Losada" description="La mejor entrenadora del mundo mundial" photo="" location="Vigo"/>
          </div>
     : 
     <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
     <TrainerCard name="María Losada" description="La mejor entrenadora del mundo mundial" photo="" location="Vigo"/>
         <TrainerCard name="Nuria Outeiral" description="La segunda mejor entrenadora" photo="" location="Vigo"/>       
          </div>
   }     
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