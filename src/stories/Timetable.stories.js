import React from 'react';
import dayjs from 'dayjs';
import { withKnobs, text, object, color, number } from '@storybook/addon-knobs';
import Timetable from '../components/Timetable';
import CvsTimetable from '../components/CvsTimetable';

export default {
	title: '화면1/타임테이블',
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

export const CanvasTimetable = () => {
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
	return <CvsTimetable timeTable={[ timetable ]} />;
};

export const CanvasTimetable2개 = () => {
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
	const startTime2 = {
		hour: number('[2]시작 시간', 16, hourOptions),
		minute: number('[2]시작 분', 17, minuteOptions)
	};
	const endTime2 = {
		hour: number('[2]끝 시간', 17, hourOptions),
		minute: number('[2]끝 분', 35, minuteOptions)
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
	const timetable2 = {
		start: {
			seconds: dayjs().hour(startTime2.hour).minute(startTime2.minute).unix(),
			nanoseconds: 0
		},
		end: {
			seconds: dayjs().hour(endTime2.hour).minute(endTime2.minute).unix(),
			nanoseconds: 0
		},
		color: color('[2]color', 'blue')
	};
	return <CvsTimetable timeTable={[ timetable, timetable2 ]} />;
};
