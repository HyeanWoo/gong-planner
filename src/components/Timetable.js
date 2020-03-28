import React, { Component } from 'react';
import { Box } from '@material-ui/core';
import { styled } from '@material-ui/styles';
import _ from 'lodash';
import dayjs from 'dayjs';
import TimeTable from '../lib/timetable';

const TimetableFrame = styled(Box)({
	'& div': {
		borderWidth: '0.5px',
		borderColor: '#00000033'
	}
});
const TimetableRow = styled(Box)({
	display: 'flex',
	height: '20px',
	lineHeight: '20px',
	background: 'white',
	borderStyle: 'none none solid none'
});
const TimeTableTime = styled(Box)({
	flexShrink: 0,
	width: '30px',
	fontSize: '5px',
	textAlign: 'center',
	borderStyle: 'none solid none none'
});
const TimetableCell = styled(Box)({
	flex: 1
});
const TimetableTen = styled(Box)({
	flex: 1,
	borderStyle: 'none solid none none'
});

export default class Timetable extends Component {
	state = {};

	static getDerivedStateFromProps(nextProps, prevState) {
		if (prevState.today !== nextProps.today) {
			const { timeTable } = nextProps;

			const refinedTimeTable = timeTable.map(time => {
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
			<TimetableRow key={i}>
				<TimeTableTime>{i}시</TimeTableTime>
				{hour.map((cell, j) => {
					let style = {};

					if (cell === '국어') style = red;
					else if (cell === '영어') style = blue;

					if ((j + 1) % 10 === 0 && j !== 59) {
						return <TimetableTen key={i * 60 + j} style={style} />;
					} else {
						return <TimetableCell key={i * 60 + j} style={style} />;
					}
				})}
			</TimetableRow>
		));
	}

	render() {
		return <TimetableFrame>{_.isEmpty(this.state.timeTable) ? '로딩중' : this.makeTimeTable()}</TimetableFrame>;
	}
}
