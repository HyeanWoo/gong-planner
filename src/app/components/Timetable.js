import React, { Component } from 'react';
import { Box } from '@material-ui/core';
import { styled } from '@material-ui/styles';
import _ from 'lodash';
import dayjs from 'dayjs';
import TimeTable from 'app/assets/lib/timetable';

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
		if (nextProps.timeTable) {
			const { timeTable } = nextProps;

			const refinedTimeTable = timeTable.map(time => {
				if (time.start.seconds > time.end.seconds) {
					[ time.start.seconds, time.end.seconds ] = [ time.end.seconds, time.start.seconds ];
				}

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

	render() {
		const { timeTable } = this.state;
		if (_.isEmpty(timeTable)) {
			return (
				<TimetableFrame>
					{[ ...Array(24) ].map((_, i) => (
						<TimetableRow key={i}>
							<TimeTableTime>{i}시</TimeTableTime>
							{[ ...Array(60) ].map((_, j) => {
								if ((j + 1) % 10 === 0 && j !== 59) {
									return <TimetableTen key={i * 60 + j} />;
								} else {
									return <TimetableCell key={i * 60 + j} />;
								}
							})}
						</TimetableRow>
					))}
				</TimetableFrame>
			);
		} else {
			const studyTime = timeTable.studyTime;

			return (
				<TimetableFrame>
					{studyTime.map((hour, i) => (
						<TimetableRow key={i}>
							<TimeTableTime>{i}시</TimeTableTime>
							{hour.map((cell, j) => {
								let style = { backgroundColor: cell };
								if ((j + 1) % 10 === 0 && j !== 59) {
									return <TimetableTen key={i * 60 + j} style={style} />;
								} else {
									return <TimetableCell key={i * 60 + j} style={style} />;
								}
							})}
						</TimetableRow>
					))}
				</TimetableFrame>
			);
		}
	}
}
