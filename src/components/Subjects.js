import React, { Component } from 'react';
import * as Q from '../firebase/subjectFuntion';

class Subjects extends Component {
  state = {
    subjects : {
      1 : {
        id: "1",
        subjectName: '바른생활', 
        totalElapsedTime: '05:00:03',
        subjectColor: '#00FFFF',
        fold: false,
        todos : [
          {
            id : "1-11",
            todoName : "바르게 생활하기",
            todoCheck : "1"
          },
          {
            id : "1-22",
            todoName : "로션 바르기",
            todoCheck : "2"
          },
        ]
      },
      2 : {
        id: "2", 
        subjectName: '슬기로운생활', 
        totalElapsedTime: '03:40:55',
        subjectColor: '#FFFF00',
        fold: false,
        todos : [
          {
            id : "2-03",
            todoName : "슬기롭게 생활하기",
            todoCheck : "1"
          },
          {
            id : "2-09",
            todoName : "녹슬기",
            todoCheck : "0"
          },
          {
            id : "2-19",
            todoName : "다슬기",
            todoCheck : "2"
          }
        ]
      },
      3 : {
        id: "3", 
        subjectName: '즐거운생활', 
        totalElapsedTime: '01:20:12',
        subjectColor: '#FF00FF',
        fold: false,
        todos : [
          {
            id : "3-51",
            todoName : "즐겁게 생활하기",
            todoCheck : "0"
          }
        ]
      }
    },
    tmpSubjectName: '',
  }

  async componentDidMount() {
    // let date = "20.03.21"; // 날짜 지정
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

  handleChange = (e) => {
    this.setState ({
      tmpSubjectName: e.target.value
    });
  }
  
  addSubject = (e) => {
    e.preventDefault();
    let id = Math.random();

    this.setState({
      subjects: {
        ...this.state.subjects, 
        [id] : {
          id: id, 
          subjectName:this.state.tmpSubjectName, 
          totalElapsedTime:"00:00:00" 
        }
      } 
    });

    this.setState({
      tmpSubjectName : ''
    });
  }

  // createSubject = () => {
  //   console.log("Nothing Here");
  //   처음에는 +버튼으로 표시하고 누르면 input창이 나타나면서 과목추가하게 만들기
  // }

  render() {
    const { subjects } = this.state;
    let todoList = [];
    for(let i=0; i < 3; i++) {
      todoList[i] = <div>hello from the {i} div</div>
    }
    const subjectList = subjects !== undefined ? (
      Object.keys(subjects).map( (key, item) => {
        return(
          <div className="subject-card" key={item}>
            <span>{subjects[key].totalElapsedTime}</span>
            <span> | </span>
            <span>{subjects[key].subjectName}</span>
            {/* <button onClick={()=>{this.updateSubject(subjects[key].id)}}>수정</button> */}
            {/* <button onClick={()=>{this.deleteSubject(subjects[key].id)}}>삭제</button> */}
            {todoList[item]}
          </div>
        )
      })
    ) : (
      <div className="emptySubjectList">
        <p>추가된 목록이 없습니다.</p>
      </div>
    );

    return(
      <div className="container col s5 offset-s2 orange subjects">
          <button onClick={this.createSubject}>+</button>
        <form onSubmit={this.addSubject}>
          <input className="orange lighten-1" type="text" id="tmpSubjectName" value={this.state.tmpSubjectName}
            placeholder="과목을 입력해보세요!" onChange={this.handleChange}/>
        </form>
        {subjectList}
      </div>
    );
  }
}

export default Subjects;