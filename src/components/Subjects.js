import React, { Component } from 'react'
import firebase from '../firebase'

class Subjects extends Component {
  state = {
    subjects : [ {id: 1, subjectName: '생물', totalElapsedTime: '05:00:03'},
    {id: 2, subjectName: '물리', totalElapsedTime: '03:40:55'},
    {id: 3, subjectName: '화학', totalElapsedTime: '01:20:12'}],
    tmpSubjectName: '',
  }

  componentDidMount() {
    // this.getData();
  }

  handleChange = (e) => {
    this.setState ({
      tmpSubjectName: e.target.value
    });
  }
  
  addSubject = (e) => {
    e.preventDefault();
    let tmpS = {id: Math.random(), subjectName:this.state.tmpSubjectName, totalElapsedTime:"00:00:00"};

    this.setState({
      subjects: [...this.state.subjects, tmpS]
    });

    this.setState({
      tmpSubjectName : ''
    });
  }

  updateSubject = (id) => {
    let changed = this.state.subjects.find( subject => subject.id === id);
    console.log(changed);
  }

  deleteSubject = (id) => {
    let subjects = this.state.subjects.filter( subject => subject.id !== id);
    this.setState({
      subjects: subjects
    });
  }

  // createSubject = () => {
  //   console.log("Nothing Here");
  //   처음에는 +버튼으로 표시하고 누르면 input창이 나타나면서 과목추가하게 만들기
  // }

  getData = () => {
    const db = firebase.firestore();
    let subRef = db.collection("testSubject");

    subRef.get().then(snapshot => {
      snapshot.forEach(doc => {
        this.setState({
          subjects : [...this.state.subjects, doc.data()]
        });
      });
    })
    .catch(err => {
      console.log('Error getting documents', err);
    });
  }

  render() {
    const { subjects } = this.state;
    const subjectList = subjects.length ? (
      subjects.map(subject => {
        return(
          <div className="subject-card" key={subject.id}>
            <div>{subject.subjectName}</div>
            <div>{subject.totalElapsedTime}</div>
            <button onClick={()=>{this.updateSubject(subject.id)}}>수정</button>
            <button onClick={()=>{this.deleteSubject(subject.id)}}>삭제</button>
          </div>
        )
      })
    ) : (
      <div className="emptySubjectList">
        <p>추가된 목록이 없습니다.</p>
      </div>
    ) ;

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