import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql'
 }); 
ReactDOM.render(
  <ApolloProvider client={client} >
  <App />
  </ApolloProvider>,
  document.getElementById('root') as HTMLElement
);