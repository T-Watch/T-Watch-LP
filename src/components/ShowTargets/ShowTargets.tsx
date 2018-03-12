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
  coaches: object[];
}
interface ShowCardsProps {
  coaches: object[];
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
        coaches: this.props.coaches,
    };
}
targets = () => {
  this.setState({
    coaches: this.props.coaches
    });  
}
  render() {
    // this.targets();
    
   

    return (
     <ul style={{ background: '#fff', padding: 24, minHeight: 280 }}>
     {this.props.coaches.map(function(coach: any, i: any) {
       return <TrainerCard name={coach.name} description={coach.email}/>;
     })}
   </ul>
    );
  }
  }
export default ShowTargets;