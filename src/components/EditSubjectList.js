import React, { Component } from 'react';
import _ from 'lodash';
import dayjs from 'dayjs';
import * as subFunctions from '../firebase/subjectFuntion';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import FolderIcon from '@material-ui/icons/Folder';
import TodoAdd from './Modals/TodoAddModal';
import TodoEditModal from './Modals/TodoEditModal';
import SubjectEditModal from './Modals/SubjectEditModal';
// import dayjs from 'dayjs';

class EditSubjectList extends Component {
	state = {
		subjects: null,
		date: null
	};

	// addSubjects(subjectName, subjectColor) {
	//   console.log(+dayjs())
	//   const subject = {

	//   }
	// }

	// addTodo(subjectId, todoName, todoCheck) {
	//   let todo = {id: "99", todoName: todoName, todoCheck: todoCheck};
	//   this.setState({

	//   })
	// }

	static getDerivedStateFromProps(nextProps, prevState) {
		if (prevState.date !== nextProps.date) {
			const { date } = nextProps;
			return {
				...prevState,
				date
			};
		}
		return prevState;
	}

	async getSubjects() {
		// const date = this.state.date || dayjs();
		const date = this.props.date;
		const colName = this.props.colName;
		// const shortDate = date.format('YY.MM.DD');
		const subjects = await subFunctions.getData(colName, date);
		if (subjects) {
			// subjects가 있는 경우
			this.setState(prevState => {
				return { ...prevState, subjects };
			});
		} else if (!_.isEmpty(this.state.subjects)) {
			// 받은 subjects가 없는데, 저장되어 있는 subjects가 있는 경우
			this.setState(prevState => {
				return { ...prevState, subjects: null };
			});
		}
	}

  componentDidMount() {
    this.getSubjects();
  }

	componentDidUpdate(prevProps, prevState) {
		if (prevState.date !== this.state.date) {
			this.getSubjects();
		}
	}

	makeSubList() {
		const classes = makeStyles(theme => ({
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

		const list = this.state.subjects ? (
			Object.keys(this.state.subjects).map(key => {
				return (
					<React.Fragment key={key}>
						<ListItem className={classes.subject}>
							<ListItemIcon>
								<FolderIcon style={{ color: this.state.subjects[key].subjectColor }} />
							</ListItemIcon>
							<ListItemText primary={this.state.subjects[key].subjectName} />
							<SubjectEditModal subject={this.state.subjects[key]} />
						</ListItem>
						<Collapse in={true} timeout='auto' unmountOnExit>
							{this.state.subjects[key].todos.map(todo => {
								return (
									<List component='div' disablePadding key={todo.id}>
										<ListItem className={classes.nested}>
											<ListItemText primary={todo.todoCheck} />
											<ListItemText primary={todo.todoName} />
											<TodoEditModal />
										</ListItem>
									</List>
								);
							})}
							<TodoAdd subjectId={key} addTodo={this.addTodo} />
						</Collapse>
					</React.Fragment>
				);
			})
		) : (
			<div>과목을 추가해주세요!</div>
		);

		return list;
	}

	render() {
		const subList = this.makeSubList();
		// console.log(this.state);
		return <div className='col s4 offset-s4'>{subList}</div>;
	}
}

export default EditSubjectList;
