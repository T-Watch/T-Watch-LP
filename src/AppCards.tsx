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
  province: string;
  search: string;
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
        province: '',
        search: '',
        fields: [],
        coaches: []
    };
    this.initCoaches();
}

initCoaches = async () => {
  try {
  const { data } = await this.props.client.query({
    query: gql`
    query Query{
      coaches{
        email
        name
        fields
      }
    }`  });
    
  this.setState({
    coaches: data.coaches
    });
} catch (e) {
  console.log(e.message);
}

}

queryFieldsProvinceSearch = async() => {
  const fields = this.state.fields;
  const province = this.state.province;
  const search = this.state.search;  
  try {
    const { data } = await this.props.client.query({
      query: gql`
      query Query($fields: [String], $province: String, $search: String) {
        coaches(fields: $fields, province: $province, search: $search){
          email
          name
          fields
        }
      }`,
      variables: {fields, province, search}
    });
  
    this.setState({
      coaches: data.coaches
      });
  } catch (e) {
    console.log(e.message);
  }
}
queryProvinceFields = async() => {
  const fields = this.state.fields;
  const province = this.state.province;
  
  try {
    const { data } = await this.props.client.query({
      query: gql`
      query Query($province: String, $fields: [String]) {
        coaches(province: $province, fields: $fields){
          email
          name
          fields
        }
      }`,
      variables: {province, fields}
    });  
    this.setState({
      coaches: data.coaches
      });
  } catch (e) {
    console.log(e.message);
  }
}
querySearchFields = async() => {
  const fields = this.state.fields;
  const search = this.state.search;
  
  try {
    const { data } = await this.props.client.query({
      query: gql`
      query Query($search: String, $fields: [String]) {
        coaches(search: $search, fields: $fields){
          email
          name
          fields
        }
      }`,
      variables: {search, fields}
    });  
    this.setState({
      coaches: data.coaches
      });
  } catch (e) {
    console.log(e.message);
  }
}
queryProvinceSearch = async() => {
  const province = this.state.province;
  const search = this.state.search;
  
  try {
    const { data } = await this.props.client.query({
      query: gql`
      query Query($province: String, $search: String) {
        coaches(province: $province, search: $search){
          email
          name
          fields
        }
      }`,
      variables: {province, search}
    });  
    this.setState({
      coaches: data.coaches
      });
  } catch (e) {
    console.log(e.message);
  }
}
queryFields = async() => {
  const fields = this.state.fields;

  try {
    const { data } = await this.props.client.query({
      query: gql`
      query Query($fields: [String]) {
        coaches(fields: $fields){
          email
          name 
          fields
        }
      }`,
      variables: {fields}
    });
    this.setState({
      coaches: data.coaches
      });
 
  } catch (e) {
    console.log(e.message);
  }
}

queryProvince = async() => {
  const province = this.state.province;
  try {
    const { data } = await this.props.client.query({
      query: gql`
      query Query($province: String) {
        coaches(province: $province){
          email
          name
          fields
        }
      }`,
      variables: {province}
    });
  
    this.setState({
      coaches: data.coaches
      });
  } catch (e) {
    console.log(e.message);
  }
}

querySearch = async() => {
  const search = this.state.search;
  try {
    const { data } = await this.props.client.query({
      query: gql`
      query Query($search: String) {
        coaches(search: $search){
          email
          name
          fields
        }
      }`,
      variables: {search}
    });  
    this.setState({
      coaches: data.coaches
      });
  } catch (e) {
    console.log(e.message);
  }
}

onChangeRunning = (e: any) => {
  if (e.target.checked === true) {
    var arrayvar = this.state.fields;
    arrayvar.push('Running');
    this.setState({ fields: arrayvar},
                  () => this.handleFields(true));

  } else {
      var array = this.state.fields;
      var index = array.indexOf('Running');
      array.splice(index, 1);
      this.setState({fields: array });
      if (array === undefined || array.length === 0) {
        this.handleFields(false);
      } else {
      this.handleFields(true);
      }
    }
}
  
onChangeCycling = (e: any) => {
  if (e.target.checked === true) {
    var arrayvar = this.state.fields;
    arrayvar.push('Cycling');
    this.setState({ fields: arrayvar},
                  () => this.handleFields(true));
    } else {
      var array = this.state.fields;
      var index = array.indexOf('Cycling');
      array.splice(index, 1);
      this.setState({fields: array });
      if (array === undefined || array.length === 0) {
        this.handleFields(false);
      } else {
      this.handleFields(true);
      }
    }
}

handleSearch = (search: any) => {
  if ((this.state.province).length !== 0 && (this.state.fields).length !== 0) {
    this.setState({search: search},
                  () => this.queryFieldsProvinceSearch());
  } else if ((this.state.province).length !== 0) {
    this.setState({search: search},
                  () => this.queryProvinceSearch());    
  } else if ((this.state.fields).length !== 0) {
    this.setState({search: search},
                  () => this.querySearchFields()); 
  } else {
    if (search === '') {
      this.initCoaches();
    } else {
        this.setState({search: search},
                      () => this.querySearch()); }
  }

}
handleProvince = async(value: any) => {
  const province = value;
  if ((this.state.search).length !== 0 && (this.state.fields).length !== 0) {
    this.setState({province: province},
                  () => this.queryFieldsProvinceSearch());
  } else if ((this.state.search).length !== 0) {
    this.setState({province: province},
                  () => this.queryProvinceSearch());    
  } else if ((this.state.fields).length !== 0) {
    this.setState({province: province},
                  () => this.queryProvinceFields()); 
  } else {
    if (province === 'Todos') {
      this.initCoaches();
  
    } else {
    this.setState({province: province},
                  () => this.queryProvince()); 
    }
  }
}

handleFields = async (select: boolean) => {
  if (select) {
    if ((this.state.search).length !== 0 && (this.state.province).length !== 0) {
      this.queryFieldsProvinceSearch();
    } else if ((this.state.search).length !== 0) {
      this.querySearchFields();   
    } else if ((this.state.province).length !== 0) {
      this.queryProvinceFields(); 
    } else {
      this.queryFields(); 
    }
  } else {
    if ((this.state.search).length !== 0 && (this.state.province).length !== 0) {
      this.queryProvinceSearch();
    } else if ((this.state.search).length !== 0) {
      this.querySearch();   
    } else if ((this.state.province).length !== 0) {
      this.queryProvince(); 
    } else {
      this.initCoaches();
    }
  }
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
        <Menu.Item key="province" >
          <Select defaultValue="Todos"  style={{ width: 120 }} onChange={this.handleProvince}>
            <Option value="A Coruña">A Coruña</Option>
            <Option value="Álava">Álava</Option>
            <Option value="Albacete">Albacete</Option>
            <Option value="Almería">Almería</Option>
            <Option value="Asturias">Asturias</Option>
            <Option value="Ávila">Ávila</Option>
            <Option value="Badajoz">Badajoz</Option>
            <Option value="Islas Baleares">Islas Baleares</Option>
            <Option value="Lugo">Lugo</Option>                        
            <Option value="Ourense">Ourense</Option> 
            <Option value="Pontevedra">Pontevedra</Option>
            <Option value="Todos">--Todos--</Option>
          </Select>
        </Menu.Item>
        <Menu.Item key="search" >
         <Search onSearchResult={this.handleSearch} /> 
       </Menu.Item>
      </Menu>
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
