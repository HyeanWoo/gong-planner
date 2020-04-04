import React, { Component } from 'react';
import _ from 'lodash';
import SubjectList from './SubjectList';

class Subjects extends Component {
	state = {
		// subjects : {
		//   1 : {
		//     id: "1",
		//     subjectName: '바른생활',
		//     totalElapsedTime: '05:00:03',
		//     subjectColor: '#00FFFF',
		//     fold: false,
		//     todos : [
		//       {
		//         id : "1-11",
		//         todoName : "바르게 생활하기",
		//         todoCheck : "1"
		//       },
		//       {
		//         id : "1-22",
		//         todoName : "로션 바르기",
		//         todoCheck : "2"
		//       },
		//     ]
		//   },
		//   2 : {
		//     id: "2",
		//     subjectName: '슬기로운생활',
		//     totalElapsedTime: '03:40:55',
		//     subjectColor: '#FFFF00',
		//     fold: false,
		//     todos : [
		//       {
		//         id : "2-03",
		//         todoName : "슬기롭게 생활하기",
		//         todoCheck : "1"
		//       },
		//       {
		//         id : "2-09",
		//         todoName : "녹슬기",
		//         todoCheck : "0"
		//       },
		//       {
		//         id : "2-19",
		//         todoName : "다슬기",
		//         todoCheck : "2"
		//       }
		//     ]
		//   },
		//   3 : {
		//     id: "3",
		//     subjectName: '즐거운생활',
		//     totalElapsedTime: '01:20:12',
		//     subjectColor: '#FF00FF',
		//     fold: false,
		//     todos : [
		//       {
		//         id : "3-51",
		//         todoName : "즐겁게 생활하기",
		//         todoCheck : "0"
		//       }
		//     ]
		//   }
		// },
		// today: ''
	};

	componentDidMount() {
		// 날짜 지정
		// this.setState({
		//   today: '20.03.19'
		// })
		// let subjects = await Q.getData(date);
		// this.setState({
		//   subjects : subjects
		// })
		// Q.createDate("20.03.19");
		// Q.createSubject(date,"50","행복한생활",this.state.subjects,[]);
		// Q.updateSubject(date, "subjectName", "1", "희망찬생활");
		// Q.updateSubject(date, "totalElapsedTime", "1", "12:30:45");
		// Q.deleteSubject(date, "50");
		// let todos = await Q.getTodos(date, "1");
		// console.log(todos);
		// Q.addTodos(date, '1', '1-33', '2', '식빵에 잼 바르기');
		// Q.updateTodos(date, '1', '1-22', '1', '넌 이미 발려있다');
		// Q.deleteTodos(date, '1','1-22', '1', '넌 이미 발려있다');
	}

	makeTodoList = () => {
		const todoList = [];
		const keys = Object.keys(this.state.subjects);
		for (let i = 0; i < keys.length; i++) {
			const { todos } = this.state.subjects[keys[i]];
			todoList[i] = todos.length ? (
				todos.map(todo => {
					return (
						<div className='todo-card' key={todo.id}>
							<span>{todo.todoCheck}</span>
							<span> : </span>
							<span>{todo.todoName}</span>
						</div>
					);
				})
			) : (
				<div className='empty-Todos'>
					<p>추가된 할일이 없습니다</p>
				</div>
			);
		}

		return todoList;
	};

	makeSubjectList = () => {
		const todoList = this.makeTodoList();

		const { subjects } = this.state;
		const subjectList =
			subjects !== undefined ? (
				Object.keys(subjects).map((key, item) => {
					return (
						<div className='subject-card' key={item}>
							<span>{subjects[key].totalElapsedTime}</span>
							<span> | </span>
							<span>{subjects[key].subjectName}</span>
							{/* <button onClick={()=>{this.updateSubject(subjects[key].id)}}>수정</button> */}
							{/* <button onClick={()=>{this.deleteSubject(subjects[key].id)}}>삭제</button> */}
							{todoList[item]}
						</div>
					);
				})
			) : (
				<div className='emptySubjectList'>
					<p>추가된 목록이 없습니다.</p>
				</div>
			);

		return subjectList;
	};

	setFold = (id, flag) => {
		let foldChange = this.state.subjects[id];
		foldChange.fold = !flag;

		this.setState({
			subjects: {
				...this.state.subjects,
				[id]: foldChange
			}
		});
	};

	render() {
		// const subjectList = this.makeSubjectList();
		console.log(this.state);
		return (
			<div className='orange subjects'>
				{/* {subjectList} */}
				<SubjectList subjects={this.props.subjects} setFold={this.setFold} />
			</div>
		);
	}
}

export default Subjects;
