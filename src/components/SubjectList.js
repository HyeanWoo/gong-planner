import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import FolderIcon from '@material-ui/icons/Folder';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const SubjectList = ({ subjects, setFold }) => {
	const useStyles = makeStyles((theme) => ({
		root: {
			width: '100%',
			maxWidth: 360
		},
		subject: {
			backgroundColor: 'orange'
		},
		nested: {
			paddingLeft: theme.spacing(4),
			backgroundColor: '#FED8B1',
			color: 'black'
		}
	}));
	const classes = useStyles();

	const listSubject = subjects
		? Object.keys(subjects).map((key) => {
				return (
					<React.Fragment key={key}>
						<ListItem
							button
							onClick={() => {
								setFold(key, subjects[key].fold);
							}}
							className={classes.subject}>
							<ListItemIcon>
								<FolderIcon style={{ color: subjects[key].subjectColor }} />
							</ListItemIcon>
							<ListItemText primary={subjects[key].subjectName} />
							{subjects[key].fold ? <ExpandLess /> : <ExpandMore />}
						</ListItem>
						<Collapse in={subjects[key].fold} timeout='auto' unmountOnExit>
							{subjects[key].todos.map((todo) => {
								return (
									<List component='div' disablePadding key={todo.id}>
										<ListItem button className={classes.nested}>
											<ListItemText primary={todo.todoCheck} />
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
