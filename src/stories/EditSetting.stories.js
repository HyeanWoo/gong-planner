import React from 'react';
import StoryRouter from 'storybook-react-router';
import { withKnobs } from '@storybook/addon-knobs';
import EditSetting from '../components/EditSetting';
import { linkTo } from '@storybook/addon-links'

export default {
	title: '화면1/에딧세팅',
	decorators: [ withKnobs, StoryRouter() ],
	parameters: {
		viewport: { defaultViewport: 'mobile2' }
	}
};

export const DefaultEditSetting = () => <EditSetting onClick={linkTo('Button', '화면1/맨윗부분')}/>;
