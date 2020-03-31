import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, number } from '@storybook/addon-knobs';
import Todaylog from '../components/Todaylog';

export default {
	title: '화면1/맨윗부분',
	decorators: [ withKnobs ],
	parameters: {
		viewport: { defaultViewport: 'mobile2' }
	}
};

export const DefaultTodaylog = () => {
	const scoreOptions = {
		range: true,
		min: 0,
		max: 10,
		step: 0.1
	};
	const totalStudyTimeOptions = {
		range: true,
		min: 0,
		max: 24 * 60 * 60,
		step: 1
	};
	const todayData = {
		wordToday: text('한마디', '한마디인부분'),
		dDay: text('디데이', 'D-123'),
		score: number('만족도', 7.5, scoreOptions),
		totalStudyTime: number('공부한시간', 200, totalStudyTimeOptions)
	};
	return <Todaylog todayData={todayData} />;
};
