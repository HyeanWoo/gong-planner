import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Container } from '@material-ui/core';
import { styled } from '@material-ui/styles';
import _ from 'lodash';
import dayjs from 'dayjs';
import './App.css';
import Home from './router/Home';
import Edit from './router/Edit';
import Setting from './router/Setting';
import { getTodayData } from './firebase/todayFunction';

const AppContainer = styled(Container)({
  fontSize: 'medium',
});

class App extends Component {
  state = {
    todayData: {
      date: dayjs(),
    },
  };

  setTodayData = (date) => {
    // 임시로 URL 검사해서 받아옴
    const pathList = window.location.pathname.split('/');
    const collectionName = pathList[1] || 'testSubject';

    const shortDateStr = date.format('YY.MM.DD');
    console.log(shortDateStr, '정보를 받아오는중..');

    getTodayData(collectionName, shortDateStr).then((data) => {
      let todayData = { date };
      if (data) {
        todayData = {
          ...todayData,
          ...data,

          // 색깔 넣어주기
          timeTable: _.map(data.timeTable, (time) => {
            const subObj = _.find(data.subjects, { subjectName: time.subject });

            return {
              ...time,
              color: subObj ? subObj.subjectColor : 'black',
            };
          }),
        };
      }
      this.setState((prevState) => {
        return { ...prevState, todayData };
      });
    });
  };

  updateTodayData = (obj) => {
    this.setState((prevState) => {
      return {
        todayData: {
          ...prevState.todayData,
          ...obj,
        },
      };
    });
  };

  setSubjects = (subjects) => {
    this.setState((prevState) => {
      return {
        todayData: {
          ...prevState.todayData,
          subjects,
        },
      };
    });
  };

  setTimeTable = (timeTable) => {
    this.setState((prevState) => {
      return {
        todayData: {
          ...prevState.todayData,
          timeTable,
        },
      };
    });
  };

  componentDidMount() {
    this.setTodayData(this.state.todayData.date);
  }

  render() {
    const { todayData } = this.state;

    const HomeComponent = (props) => (
      <Home
        todayData={todayData}
        onChangeTodayData={this.setTodayData}
        onChangeSubjects={this.setSubjects}
        onChangeTimeTable={this.setTimeTable}
        {...props}
      />
    );
    const EditComponent = (props) => (
      <Edit
        todayData={todayData}
        onChangeSubjects={this.setSubjects}
        {...props}
      />
    );

    return (
      <BrowserRouter>
        <AppContainer maxWidth='sm'>
          <Switch>
            <Route path='/:colName/edit' component={EditComponent} />
            <Route path='/:colName/setting' component={Setting} />
            <Route path='/:colName' component={HomeComponent} />
            <Route exact path='/' component={HomeComponent} />
          </Switch>
        </AppContainer>
      </BrowserRouter>
    );
  }
}

export default App;
