import React, { Component } from 'react'
import { getData, createDate, createSubject, updateSubject} from '../firebase/subjectFuntion'

class Subjects extends Component {
  state = {
    subjects : {
      1 : {
        id: "1",
        subjectName: '바른생활', 
        totalElapsedTime: '05:00:03',
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
    let date = "20.20.20"; // 날짜 지정
    // let subjects = await getData(date);
    // this.setState({
    //   subjects : subjects
    // })

    // createDate("20.03.19");
    // createDate("20.03.20");
    // createSubject(date,"50","행복한생활",this.state.subjects);
    // createSubject(date,"33","편안한생활",this.state.subjects);
    // updateSubject(date, "33", "활기찬생활");
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
    const subjectList = subjects !== undefined ? (
      Object.keys(subjects).map( (key, item) => {
        return(
          <div className="subject-card" key={item}>
            <div>{subjects[key].subjectName}</div>
            <div>{subjects[key].totalElapsedTime}</div>
            {/* <button onClick={()=>{this.updateSubject(subjects[key].id)}}>수정</button> */}
            {/* <button onClick={()=>{this.deleteSubject(subjects[key].id)}}>삭제</button> */}
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