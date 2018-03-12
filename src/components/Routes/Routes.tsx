import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from '../../App';
import AppCards from '../../AppCards';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Button, Icon, Menu } from 'antd';
const SubMenu = Menu.SubMenu;

interface RoutesState {
collapsed: boolean;
}
class Routes extends React.Component<any,
RoutesState> {

     constructor(props: any) {
        super(props);
        this.state = {
            collapsed: false
        };
    }
      toggleCollapsed = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
      }
    render() {
      return (  
        <Router>
         <div>
        <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
        <Icon type={'menu-fold'} />
      </Button>
{this.state.collapsed ?
    <div>
    
    <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['1']}
          mode="horizontal"
          theme="dark"
          inlineCollapsed={false}
      >
          <Menu.Item key="1">
            <Link to="/"><Icon type="home" /></Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/coaches"><Icon type="team" /></Link>
          </Menu.Item>
      </Menu>
      </div>
      :
      null}
    <div>
      <Route exact path="/" component={App} />
      <Route path="/coaches" component={AppCards} />
    </div>
</div> 
  </Router>   
   );
  }
}
export default Routes;
