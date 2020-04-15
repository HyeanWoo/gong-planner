import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ChangeHistoryRoundedIcon from '@material-ui/icons/ChangeHistoryRounded';
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';

const SubjectList = ({ subjects, setFold }) => {
	const useStyles = makeStyles(theme => ({
		root: {
			width: '100%',
			padding: 0,
			backgroundColor: 'transparent',
			color: 'black',
			boxShadow: 'none'
		},
		subject: {},
		subjectColor: {
			minWidth: '8px',
			marginRight: '16px'
		},
		subjectText: {
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center'
		},
		nested: {
			paddingLeft: theme.spacing(4),
			backgroundColor: '#EEEEEE',
			color: 'black'
		}
	}));
	const classes = useStyles();

	const listSubject = subjects
		? Object.keys(subjects).map(key => {
				return (
					<React.Fragment key={key}>
						<ListItem
							button
							onClick={() => {
								setFold(key, subjects[key].fold);
							}}
							className={classes.subject}>
							<Box
								className={classes.subjectColor}
								style={{ backgroundColor: subjects[key].subjectColor }}
							/>
							<ListItemText
								className={classes.subjectText}
								primary={subjects[key].subjectName}
								secondary={'00:00:00'}
							/>
							{subjects[key].fold ? <ExpandLess /> : <ExpandMore />}
						</ListItem>
						<Collapse in={subjects[key].fold} timeout='auto' unmountOnExit>
							{subjects[key].todos.map(todo => {
								return (
									<List component='div' disablePadding key={todo.id}>
										<ListItem button className={classes.nested}>
											<ListItemIcon>
												{todo.todoCheck === '3' ? (
													<ClearRoundedIcon />
												) : todo.todoCheck === '2' ? (
													<CheckCircleOutlineRoundedIcon />
												) : todo.todoCheck === '1' ? (
													<ChangeHistoryRoundedIcon />
												) : (
													<CheckBoxOutlineBlankIcon />
												)}
											</ListItemIcon>
											<ListItemText primary={todo.todoName} />
										</ListItem>
									</List>
								);
							})}
						</Collapse>
					</React.Fragment>
				);
			})
		: '리스트 비었음ㅎ';

	return (
		<List component='nav' aria-labelledby='nested-list-subheader' className={classes.root}>
			{listSubject}
		</List>
	);
};

export default SubjectList;
