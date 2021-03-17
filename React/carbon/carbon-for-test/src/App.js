import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Content } from 'carbon-components-react';
import './App.scss';
import HeaderBase from './components/HeaderBase';
import Home from './view/Home';
import NotificationRule from './view/NotificationRule';

class App extends Component {
  render() {
    return (
      <>
        <HeaderBase />
        <Content>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/notifRule" component={NotificationRule} />
          </Switch>
        </Content>
      </>
    );
  }
}

export default App;
