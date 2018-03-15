import React from 'react';
import * as ReactDOM from 'react-dom';
import './ButtonGoCards.css';
import { Col, Row, Button } from 'antd';
import AppCards from '../../AppCards';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

interface GetCoachesState {
  showComponent: boolean;
}

const client = new ApolloClient({
    uri: 'http://localhost:3005/graphql'
   }); 

export default class GetCoachesCards extends React.Component <any,
GetCoachesState> { 
   
    constructor(props: any) {
        super(props);
        this.state = {
          showComponent: false,
        };
      }
    _onButtonClick = () => {
        
          ReactDOM.render(
            <ApolloProvider client={client} >
            <AppCards />
            </ApolloProvider>,
            document.getElementById('root') as HTMLElement
          );
      }
render() {
    return(
        <div className="getCards">
            <Row>
            <Button 
              type="dashed"  
              style={{backgroundColor: '#d9d9d9'}}  
              onClick={this._onButtonClick}
            > 
            Échale un vistazo a nuestros entrenadores
            </Button>
            </Row>
        
        </div>
    );
}

}
