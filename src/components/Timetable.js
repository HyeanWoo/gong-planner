import React, { Component } from 'react';
import dayjs from 'dayjs';
import TimeTable from '../lib/timetable';
import * as timeTableDB from '../firebase/timeTableFunction';

export default class Timetable extends Component {
	constructor(props) {
		super(props);
		this.state = { timeTable: null };
	}

	componentDidMount() {
		const collectionName = 'testSubject';
		const date = '20.03.21';
		timeTableDB.getTimeTable(collectionName, date).then((timeTable) => {
			this.setState(
				{
					timeTable: new TimeTable(
						timeTable.map((time) => {
							return {
								...time,
								start: dayjs.unix(time.start.seconds),
								end: dayjs.unix(time.end.seconds)
							};
						})
					)
				},
				this.makeTimeTable
			);
		});
	}

	makeTimeTable(hour = 24, minute = 60) {
		const studyTime = this.state.timeTable.studyTime;
		const red = { backgroundColor: 'red' };
		const blue = { backgroundColor: 'blue' };

		return studyTime.map((hour, i) => (
			<div key={i} className='timetable-row'>
				<div className='timetable-time'>{i}시</div>
				{hour.map((cell, j) => {
					let style = {},
						className = [ 'timetable-cell' ];
					if (cell === '국어') style = red;
					else if (cell === '영어') style = blue;
					if ((j + 1) % 10 === 0 && j !== 59) {
						className.push('timetable-ten');
					}
					return <div key={i * 60 + j} className={className.join(' ')} style={style} />;
				})}
			</div>
		));
	}

	render() {
		if (this.state.timeTable) {
			return <div className='col s3 yellow timetable'>{this.makeTimeTable()}</div>;
		} else {
			return <div className='col s3 yellow timetable'>로딩중</div>;
		}
	}
}
