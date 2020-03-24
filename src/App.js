import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import './App.css';
import Home from './router/Home';
import EditPage from './router/EditPage';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route exact path="/" component={Home}/>
          <Route path="/edit" component={EditPage}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
