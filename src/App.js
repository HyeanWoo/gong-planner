import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Container } from '@material-ui/core';
import { styled } from '@material-ui/styles';
import dayjs from 'dayjs';
import './App.css';
import Home from './router/Home';
import Edit from './router/Edit';
import Setting from './router/Setting';
import { getTodayData } from './firebase/todayFunction';

const AppComponent = styled(Container)({
	fontSize: 'medium'
});

class App extends Component {
	state = {
		todayData: {
			date: dayjs()
		}
	};

	setTodayData = date => {
		const shortDateStr = date.format('YY.MM.DD');

		console.log(shortDateStr, '정보를 받아오는중..');

		// 임시로 URL 검사해서 받아옴
		const collectionName = window.location.pathname.substring(1) || 'testSubject';

		getTodayData(collectionName, shortDateStr).then(data => {
			const todayData = data ? data : {};
			todayData.date = date;

			console.log(todayData);
			this.setState(prevState => {
				return { ...prevState, todayData };
			});
		});
	};

	render() {
		console.log(this.state.todayData);

		const HomeComponent = props => (
			<Home todayData={this.state.todayData} onChangeTodayData={this.setTodayData} {...props} />
		);

		return (
			<BrowserRouter>
				<AppComponent>
					<Switch>
						<Route exact path='/' component={HomeComponent} />
						<Route path='/:colName/edit' component={Edit} />
						<Route path='/:colName/setting' component={Setting} />
						<Route path='/:colName' component={HomeComponent} />
					</Switch>
				</AppComponent>
			</BrowserRouter>
		);
	}
}

export default App;
