import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import './ShowTargets.css';
import TrainerCard from '../TrainerCard/TrainerCard';
const { Header, Content, Footer } = Layout;
const  SubMenu  = Menu.SubMenu; 

interface ShowCardsState {
  submenu: string;
  item: string;
}
interface ShowCardsProps {
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
let returnTargets = VigoRunningCoaches;

class ShowTargets extends React.Component  <ShowCardsProps, ShowCardsState > {
  constructor(props: ShowCardsProps) {
    super(props);
    this.state = {
        submenu: this.props.submenu,
        item: this.props.item
    };
    console.log(this.state.submenu + ' ' + this.state.item);
    this.targets();
}

targets = () => {
  const item = this.props.item;
  const submenu = this.props.submenu;
  console.log('submenu ' + submenu + ' item ' + item);
  if (submenu === 'Running') {
    if (item === 'Vigo') {
      console.log('Vigo Running');
    } else if (item === 'Ourense') {
      console.log('Ourense Running');
    } else if (item === 'Lugo') {
      console.log('Lugo Running');
    } else {
      console.log('Running');
      
   }
  } else if (submenu === 'Cycling') {
    if (item === 'Vigo') {
      console.log('Vigo Cycling');
      } else if (item === 'Ourense') {
        console.log('Ourense Cycling');  
      } else if (item === 'Lugo') {
      console.log('Lugo Cycling');
      } else {
      console.log(' Cycling');
        
     }  
  } else {
    console.log('todos');
    
  }
}

  render() {
    return (
      <div style={{ background: '#fff', padding: 24, minHeight: 280 }}> 
      {returnTargets}
      </div>
    );
  }
}
export default ShowTargets;