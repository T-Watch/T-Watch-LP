import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Layout, Menu, Breadcrumb, Icon, Checkbox, Select } from 'antd';
import './App.css';
import Search from './components/Search/Search';
import ShowTargets from './components/ShowTargets/ShowTargets';
import TrainerCard from './components/TrainerCard/TrainerCard';
const { Header, Content, Footer, Sider } = Layout;
const  SubMenu  = Menu.SubMenu; 
const Option = Select.Option;
import { withApollo } from 'react-apollo';
import { gql } from 'apollo-boost';

interface AppCardsState {
  submenu: string;
  item: string;
  fields: string[];
  coaches: object[];
}

interface ApolloProps {
  client: any;
}

class AppCards extends React.Component  <ApolloProps , AppCardsState > {
  constructor(props: ApolloProps ) {
    super(props);
    this.state = {
        submenu: '',
        item: '',
        fields: [],
        coaches: []
    };
}
handleClick = (e: any) => {
  console.log('click ', e.keyPath);
}

handleAddress = (value: any) => {
  console.log(`selected ${value}`);
}

_createLink = async () => {
  const fields = this.state.fields;
  console.log('olas' + fields);
  try {
  const { data } = await this.props.client.query({
    query: gql`
    query Query($fields: [String]) {
      coaches(fields: $fields){
        email,
        name
      }
    }`,
    variables: fields
  });
  this.setState({
    coaches: data.coaches
    });
  console.log(this.state.coaches);

} catch (e) {
  console.log(e.message);
}

}
onChangeRunning = (e: any) => {
  console.log(`${e.target.checked}`);
  if (e.target.checked === true) {
    var arrayvar = this.state.fields;
    arrayvar.push('running');
    this.setState({
      fields: arrayvar
      });
   } else {
      var array = this.state.fields;
      var index = array.indexOf('running');
      array.splice(index, 1);
      this.setState({fields: array });
    }
  this._createLink();
  console.log(this.state.fields);
}
  
  // const fields = this.state.fields;
// this._createLink();

onChangeCycling = (e: any) => {
  console.log(`${e.target.checked}`);
  if (e.target.checked === true) {
    var arrayvar = this.state.fields;
    arrayvar.push('cycling');
    this.setState({
      fields: arrayvar
      });
   } else {
      var array = this.state.fields;
      var index = array.indexOf('cycling');
      array.splice(index, 1);
      this.setState({fields: array });
    }
  this._createLink();
  console.log(this.state.fields);
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
        coaches={this.state.coaches} 
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

export default withApollo<{}, {}>(AppCards as any);
