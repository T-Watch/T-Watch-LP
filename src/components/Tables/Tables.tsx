import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from '../../App';
import AppCards from '../../AppCards';
import './Tables.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;
class Tables extends React.Component {

  callback = (key: any) => {
    console.log(key);
  }

    render() {
      return (  
<Tabs defaultActiveKey="1" onChange={this.callback}>

    <TabPane tab="Home" key="1"><App/></TabPane>
    <TabPane tab="Coaches" key="2"><AppCards/></TabPane>
  </Tabs>     
   );
    }
}
export default Tables;
