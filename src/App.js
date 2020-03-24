import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import './App.css';
import Home from './router/Home';
import Edit from './router/Edit';
import Setting from './router/Setting';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route exact path="/" component={Home}/>
          <Route path="/edit" component={Edit}/>
          <Route path='/setting' component={Setting}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
