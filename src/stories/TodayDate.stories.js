import React from 'react';
import dayjs from 'dayjs';
import { withKnobs, manager, date } from '@storybook/addon-knobs';
import TodayDate from '../components/TodayDate';

export default {
	title: '화면1/날짜변경',
	decorators: [ withKnobs ],
	parameters: {
		viewport: { defaultViewport: 'mobile2' }
	}
};

export const DefaultTodayDate = () => {
	const today = date('날짜');
	const onChangeDate = changedDate => {
		window.__STORYBOOK_ADDONS.channel.emit('storybookjs/knobs/change', {
			name: '날짜',
			value: changedDate.toDate()
		});
	};
	return <TodayDate date={dayjs(today)} onChangeDate={onChangeDate} />;
};
