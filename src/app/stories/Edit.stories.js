import React from 'react';
import StoryRouter from 'storybook-react-router';
import dayjs from 'dayjs';
import { withKnobs } from '@storybook/addon-knobs';
import Edit from '../router/Edit';

export default {
	title: '화면2/완전체',
	decorators: [ withKnobs, StoryRouter() ],
	parameters: {
		viewport: { defaultViewport: 'mobile2' }
	}
};

export const DefaultEdit = () => {
	const props = {
		date: dayjs()
	};
	return <Edit {...props} />;
};
