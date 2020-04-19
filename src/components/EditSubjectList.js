import React, { Component } from 'react';
import _ from 'lodash';
import { getData } from '../firebase/subjectFuntion';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import FolderIcon from '@material-ui/icons/Folder';
import SubjectAddModal from '../components/Modals/SubjectAddModal';
import SubjectEditModal from './Modals/SubjectEditModal';
import TodoAdd from './Modals/TodoAddModal';
import TodoEditModal from './Modals/TodoEditModal';
import ChangeHistoryRoundedIcon from '@material-ui/icons/ChangeHistoryRounded';
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';

class EditSubjectList extends Component {
	state = {
		subjects: null,
		date: null,
		isGoingToRendering: false
	};

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

	async getSubjects(colName, date) {
		// const date = this.state.date || dayjs();
		// const shortDate = date.format('YY.MM.DD');
		const subjects = await getData(colName, date);
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

	reRenderSubject = subjectItems => {
		this.setState({ subjects: subjectItems });
	};

	componentDidMount() {
    // this.getSubjects(this.props.colName, this.props.date);
    // console.log(this.props.todayData);
    this.setState({
      subjects: this.props.todayData
    })
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.date !== this.state.date) {
			this.getSubjects(this.props.colName, this.props.date);
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
							<SubjectEditModal
								subjectId={key}
								colName={this.props.colName}
								date={this.props.date}
								subject={this.state.subjects[key]}
								reRenderSubject={this.reRenderSubject}
							/>
						</ListItem>
						<Collapse in={true} timeout='auto' unmountOnExit>
							{this.state.subjects[key].todos.map(todo => {
								return (
									<List component='div' disablePadding key={todo.id}>
										<ListItem className={classes.nested}>
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
											<TodoEditModal
												subjectId={key}
												colName={this.props.colName}
												date={this.props.date}
												todo={todo}
												reRenderSubject={this.reRenderSubject}
											/>
										</ListItem>
									</List>
								);
							})}
							<TodoAdd
								subjectId={key}
								colName={this.props.colName}
								date={this.props.date}
								reRenderSubject={this.reRenderSubject}
							/>
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

		return (
			<div className='edit-subjest-list'>
				<div>{subList}</div>
				<div style={{ marginTop: '3%' }}>
					<SubjectAddModal
						colName={this.props.colName}
						date={this.props.date}
						reRenderSubject={this.reRenderSubject}
					/>
				</div>
			</div>
		);
	}
}

export default EditSubjectList;
