import * as React from 'react';
import { Layout, Menu, Icon, Checkbox, Select } from 'antd';
import './App.css';
import Search from './components/Search/Search';
import ShowTargets from './components/ShowTargets/ShowTargets';
const {  Content, Footer } = Layout;
const Option = Select.Option;
import { withApollo } from 'react-apollo';
import { gql } from 'apollo-boost';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import App from './App';

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
    this.initCoaches();
}
handleClick = (e: any) => {
  console.log('click ', e.keyPath);
}
handleAddress = (value: any) => {
  console.log(`selected ${value}`);
}

initCoaches = async () => {
  const fields = this.state.fields;
  try {
  const { data } = await this.props.client.query({
    query: gql`
    query Query{
      coaches{
        email
        name
      }
    }`  });
  this.setState({
    coaches: data.coaches
    });
  console.log(this.state.coaches);

} catch (e) {
  console.log(e.message);
}

}
_createLink = async () => {
  const fields = this.state.fields;
  try {
  const { data } = await this.props.client.query({
    query: gql`
    query Query($fields: [String]) {
      coaches(fields: $fields){
        email
        name
      }
    }`,
    variables: {fields}
  });
  this.setState({
    coaches: data.coaches
    });
  console.log(fields);
  console.log(data.coaches);
} catch (e) {
  console.log(e.message);
}

}
onChangeRunning = (e: any) => {
  console.log(`${e.target.checked}`);
  if (e.target.checked === true) {
    var arrayvar = this.state.fields;
    arrayvar.push('Running');
    this.setState({
      fields: arrayvar
      });
    this._createLink();
    } else {
      var array = this.state.fields;
      var index = array.indexOf('Running');
      array.splice(index, 1);
      this.setState({fields: array });
      console.log('esta vacio? running' + array);

      if (array === undefined || array.length === 0) {
        console.log('si');

        this.initCoaches();
    } else {
      this._createLink();
        
      }
    }
  console.log(this.state.fields);
}
  
  // const fields = this.state.fields;
// this._createLink();

onChangeCycling = (e: any) => {
  console.log(`${e.target.checked}`);
  if (e.target.checked === true) {
    var arrayvar = this.state.fields;
    arrayvar.push('Cycling');
    this.setState({
      fields: arrayvar
      });
    this._createLink();
    } else {
      var array = this.state.fields;
      var index = array.indexOf('Cycling');
      array.splice(index, 1);
      this.setState({fields: array });
      console.log('esta vacio? cycling' + array);
      if (array === undefined || array.length === 0) {
        console.log('si');        
        this.initCoaches();
    } else {
    this._createLink();
      
    }

    }
  console.log(this.state.fields);
}

onSearch = (e: any) => {
  console.log(e);
}

cards = () => (
  <div>
      <Menu
        defaultSelectedKeys={['home']}
        defaultOpenKeys={['home']}
        mode="horizontal"
        theme="dark"
        inlineCollapsed={false}
      >
      <Menu.Item key="home">
             <Link to="/"><Icon type="home" /></Link>
         </Menu.Item>
         <Menu.Item key="team">
             <Link to="/coaches"><Icon type="team" /></Link>
         </Menu.Item>
        <Menu.Item key="running" >
         <Checkbox style={{color: 'white'}} onChange={this.onChangeRunning}>Running</Checkbox>
        </Menu.Item>
        <Menu.Item key="cycling" >   
           <Checkbox style={{color: 'white'}} onChange={this.onChangeCycling}>Cycling</Checkbox>
        </Menu.Item>
        <Menu.Item key="address" >
          <Select defaultValue="Pontevedra"  style={{ width: 120 }} onChange={this.handleAddress}>
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
    <Content style={{ padding: '0 50px' }}>

      <div style={{ background: '#fff', padding: 24, minHeight: 280 }}> 
      {console.log('render')}

      {console.log(this.state.coaches)}
      <ShowTargets 
        coaches={this.state.coaches} 
      /> {/*https://reactjs.org/docs/conditional-rendering.html*/}
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>
    T-Watch ©2018 Created by mlousada
    </Footer>
  </div>
)
  render() {
    return (
      <Router>
      <div> 
    <div>
      <Route exact={true} path="/" component={App} />
      <Route path="/coaches" component={this.cards} />
    </div>
</div> 
  </Router> 
    );
  }
}

export default withApollo<{}, {}>(AppCards as any);
