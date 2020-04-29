import React from 'react';
import { Box } from '@material-ui/core';
import { styled } from '@material-ui/styles';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import SettingsIcon from '@material-ui/icons/Settings';
import { Link } from 'react-router-dom';

const RightContentBox = styled(Box)({
	display: 'flex',
	justifyContent: 'flex-end',
	alignItems: 'center'
});

const EditSetting = ({ colName }) => {
	const editUrl = '/' + colName + '/edit';
	const settingUrl = '/' + colName + '/setting';

	return (
		<RightContentBox>
			<Link to={editUrl}>
				<IconButton aria-label='edit'>
					<EditIcon />
				</IconButton>
			</Link>
			<Link to={settingUrl}>
				<IconButton aria-label='setting'>
					<SettingsIcon />
				</IconButton>
			</Link>
		</RightContentBox>
	);
};

export default EditSetting;
