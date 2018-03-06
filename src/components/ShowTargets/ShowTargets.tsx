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
      id="entrenador@gmail.com" 
      name="Raul Iglesias" 
      description="El mejor entrenador del mundo mundial" 
      photo="" 
      location="Vigo"
      type="Running"
    />
     
);

const VigoCyclingCoaches =  (
    <TrainerCard 
      id="entrenador@gmail.com"
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
      id="entrenador@gmail.com"
      name="Hector González" 
      description="La mejor entrenadora del mundo mundial" 
      photo="" 
      location="Ourense"
      type="Running"
     />
    <TrainerCard 
      id="entrenador@gmail.com"
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
      id="entrenador@gmail.com"
      name="Nuria Outeiral" 
      description="El mejor entrenador del mundo mundial" 
      photo="" 
      location="Ourense"
      type="Cycling"
    />
);

// LUGO
const LugoRunningCoaches =  (
  <TrainerCard 
      id="entrenador@gmail.com"
      name="Martin Paz" 
      description="El mejor entrenador del mundo mundial" 
      photo="" 
      location="Lugo"
      type="Running"
  />
);

const LugoCyclingCoaches =  (
    <TrainerCard 
      id="entrenador@gmail.com"
      name="Martin Paz" 
      description="El mejor entrenador del mundo mundial" 
      photo="" 
      location="Lugo"
      type="Cycling"
    />
);

const runningCoaches = [VigoRunningCoaches, OurenseRunningCoaches];
const cyclingCoaches = [LugoCyclingCoaches, OurenseCyclingCoaches, VigoCyclingCoaches];
const coaches = [runningCoaches, cyclingCoaches];
let returnTargets: any = null;

class ShowTargets extends React.Component  <ShowCardsProps, ShowCardsState > {
  constructor(props: ShowCardsProps) {
    super(props);
    this.state = {
        submenu: this.props.submenu,
        item: this.props.item
    };
    console.log(this.state.submenu + ' ' + this.state.item);
}

targets = () => {
  const item = this.props.item;
  const submenu = this.props.submenu;
  console.log('submenu ' + submenu + ' item ' + item);
  if (submenu === 'Running') {
    if (item === 'Vigo') {
      returnTargets = VigoRunningCoaches;
      console.log('Vigo Running');
    } else if (item === 'Ourense') {
      returnTargets = OurenseRunningCoaches;
      console.log('Ourense Running');
    } else if (item === 'Lugo') {
      returnTargets = LugoRunningCoaches;
      console.log('Lugo Running');
    } else {
      returnTargets = runningCoaches;
      console.log('Running'); 
   }
  } else if (submenu === 'Cycling') {
    if (item === 'Vigo') {
      returnTargets = VigoCyclingCoaches;
      console.log('Vigo Cycling');
      } else if (item === 'Ourense') {
      returnTargets = OurenseCyclingCoaches;
      console.log('Ourense Cycling**');  
      } else if (item === 'Lugo') {
      returnTargets = LugoCyclingCoaches;
      console.log('Lugo Cycling');
      } else {
      returnTargets = cyclingCoaches;
      console.log(' Cycling');
        
     }  
  } else {
    returnTargets = coaches;
    console.log('todos');
  }
}

  render() {
    this.targets();
    return (
      <div style={{ background: '#fff', padding: 24, minHeight: 280 }}> 
      {returnTargets}
      </div>
    );
  }
}
export default ShowTargets;