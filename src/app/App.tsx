import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Container } from '@material-ui/core';
import { styled } from '@material-ui/styles';
import lodash from 'lodash';
import 'app/App.css';
import { Edit, Home, Setting } from 'app/router';
import { getTodayData } from 'app/firebase/todayFunction';
import { AppState, StudyRecord, Date } from 'app/types';

const AppContainer = styled(Container)({
  fontSize: 'medium',
});

class App extends Component {
  public state = new AppState();

  setTodayData = (date: Date) => {
    // 임시로 URL 검사해서 받아옴
    const pathList = window.location.pathname.split('/');
    const collectionName = pathList[1] || 'testSubject';

    const shortDateStr = date.format('YY.MM.DD');
    console.log(shortDateStr, '정보를 받아오는중..');

    getTodayData(collectionName, shortDateStr).then((data) => {
      let todayData: StudyRecord = { date };
      if (data) {
        Object.assign(todayData, data);
        todayData.timeTable = lodash.map(data.timeTable, (time) => {
          const subObj = lodash.find(data.subjects, { subjectName: time.subject });

          return {
            ...time,
            color: subObj ? subObj.subjectColor : 'black',
          };
        });
      }

      this.setState((prevState) => {
        return { ...prevState, todayData };
      });
    });
  };

  updateTodayData = (obj) => {
    this.setState((prevState: AppState) => {
      return {
        todayData: {
          ...prevState.todayData,
          ...obj,
        },
      };
    });
  };

  setSubjects = (subjects) => {
    this.setState((prevState: AppState) => {
      return {
        todayData: {
          ...prevState.todayData,
          subjects,
        },
      };
    });
  };

  setTimeTable = (timeTable) => {
    this.setState((prevState: AppState) => {
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

    // const asdf = {
    //   aaa:1,
    //   bbb:123123,
    //   ccc:'haha',
    //   ddd: false,
    //   eee: [],
    //   fff: {
    //     qweqwe: 'aaa'
    //   }
    // }
    // window.localStorage.setItem('Preferences', JSON.stringify(asdf));

    // const aa = window.localStorage.getItem('Preferences') || '{}';
    // console.log(JSON.parse(aa));

    const HomeComponent: (any) => JSX.Element = (props) => {
      console.log(props)
      return (
      <Home
        todayData={todayData}
        onChangeTodayData={this.setTodayData}
        onChangeSubjects={this.setSubjects}
        onChangeTimeTable={this.setTimeTable}
        {...props}
      />
    )};
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
            <Route exact path='/' component={HomeComponent} />
            <Route path='/:colName/edit' component={EditComponent} />
            <Route path='/:colName/setting' component={Setting} />
            <Route path='/:colName' component={HomeComponent} />
          </Switch>
        </AppContainer>
      </BrowserRouter>
    );
  }
}

export default App;
