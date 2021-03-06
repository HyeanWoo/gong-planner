import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import Subjects from '../components/Subjects';

export default {
	title: '화면1/과목리스트',
	decorators: [ withKnobs ],
	parameters: {
		viewport: { defaultViewport: 'mobile2' }
	}
};

export const DefaultSubjectList = () => <Subjects />;
