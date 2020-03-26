import React, { Component } from 'react';
import _ from 'lodash';
import dayjs from 'dayjs';
import TimeTable from '../lib/timetable';

export default class Timetable extends Component {
	state = {};

	static getDerivedStateFromProps(nextProps, prevState) {
		if (prevState.today !== nextProps.today) {
			const { timeTable } = nextProps;

			const refinedTimeTable = timeTable.map((time) => {
				return {
					...time,
					start: dayjs.unix(time.start.seconds),
					end: dayjs.unix(time.end.seconds)
				};
			});

			return {
				today: nextProps.today,
				timeTable: new TimeTable(refinedTimeTable)
			};
		}
		return {};
	}

	// TODO: 과목 리스트에서 color 받아서 변경하는걸로 고쳐야됨
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
		if (_.isEmpty(this.state.timeTable)) {
			return <div className='col s3 yellow timetable'>로딩중</div>;
		} else {
			return <div className='col s3 yellow timetable'>{this.makeTimeTable()}</div>;
		}
	}
}
