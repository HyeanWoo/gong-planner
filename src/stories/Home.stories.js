import React from 'react';
import StoryRouter from 'storybook-react-router';
import dayjs from 'dayjs';
import { withKnobs } from '@storybook/addon-knobs';
import Home from '../router/Home';

export default {
	title: '화면1/완전체',
	decorators: [ withKnobs, StoryRouter() ],
	parameters: {
		viewport: { defaultViewport: 'mobile2' }
	}
};

export const DefaultHome = () => {
	const props = {
		todayData: {
			date: dayjs()
		}
	};
	return <Home {...props} />;
};
