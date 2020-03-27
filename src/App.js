import React, {Component} from 'react';
import {BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './router/Home';
import Edit from './router/Edit';
import Setting from './router/Setting';
import Collections from './router/Collections';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/edit" component={Edit}/>
            <Route path='/setting' component={Setting}/>
            <Route path='/:col_name' component={Collections}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
