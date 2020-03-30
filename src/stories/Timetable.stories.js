import React from 'react';
import dayjs from 'dayjs';
import { withKnobs, text, object, color, number } from '@storybook/addon-knobs';
import Timetable from '../components/Timetable';

export default {
	title: '타임테이블',
	decorators: [ withKnobs ],
	parameters: {
		viewport: { defaultViewport: 'mobile2' }
	}
};

export const DefaultTimetable = () => {
	const today = text('today', dayjs().format('YY.MM.DD'));
	const hourOptions = {
		range: true,
		min: 0,
		max: 23,
		step: 1
	};
	const minuteOptions = {
		range: true,
		min: 0,
		max: 59,
		step: 1
	};
	const startTime = {
		hour: number('시작 시간', 12, hourOptions),
		minute: number('시작 분', 37, minuteOptions)
	};
	const endTime = {
		hour: number('끝 시간', 13, hourOptions),
		minute: number('끝 분', 16, minuteOptions)
	};

	const timetable = {
		start: {
			seconds: dayjs().hour(startTime.hour).minute(startTime.minute).unix(),
			nanoseconds: 0
		},
		end: {
			seconds: dayjs().hour(endTime.hour).minute(endTime.minute).unix(),
			nanoseconds: 0
		},
		color: color('color', 'red')
	};
	return <Timetable today={today} timeTable={[ timetable ]} />;
};
