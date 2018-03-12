import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import AppCards from './AppCards';
import Tables from './components/Tables/Tables';
import Routes from './components/Routes/Routes';
import './index.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql'
 }); 
ReactDOM.render(
  <ApolloProvider client={client} >
  <Routes />
  </ApolloProvider>,
  document.getElementById('root') as HTMLElement
);