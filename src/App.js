import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Home from './router/Home'

class App extends Component {
  render() {
   return (
     <BrowserRouter>
      <div className="App">
        <Route exact to="/" component={Home}/>  
      </div>
    </BrowserRouter>
   );
  }
}

export default App;
