import React, {Component} from 'react';
import {BrowserRouter, Route, Switch } from 'react-router-dom';
import dayjs from 'dayjs';
import './App.css';
import Home from './router/Home';
import Edit from './router/Edit';
import Setting from './router/Setting';
import Collections from './router/Collections';
import { getTodayData } from './firebase/todayFunction';

class App extends Component {
  state = {
    todayData: { 
      date: dayjs()
    }
  };

  setTodayData = (date) => {
    	const shortDateStr = date.format('YY.MM.DD');

      console.log(shortDateStr, '정보를 받아오는중..');
      getTodayData(shortDateStr).then((data) => {
        const todayData = data ? data : {};
        todayData.date = date;

        console.log(todayData);
        this.setState(prevState => {
          return { ...prevState, todayData }
        });
    });
  }

  render() {
    console.log(this.state.todayData);
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/" component={() => (
              <Home 
                todayData={this.state.todayData}
                onChangeTodayData={this.setTodayData} />)}/>
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
