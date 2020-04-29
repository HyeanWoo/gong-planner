import React, { Component } from 'react';
import _ from 'lodash';
import SubjectList from './SubjectList';

class Subjects extends Component {
	state = {
    subjects: null,
    date: this.props.date.format('YY.MM.DD')
	};

	componentDidMount() {
		this.setState({
      subjects: this.props.subjects,
		});
	}

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
  
  reRenderSubject = (subjectItems) => {
    this.props.onChangeSubjects(subjectItems);
  };

	render() {
		return ( 
      <SubjectList
        colName={this.props.colName} 
        date={this.props.date.format('YY.MM.DD')} 
        subjects={this.props.subjects} 
        setFold={this.setFold} 
        reRenderSubject={this.reRenderSubject}
      />
    );
	}
}

export default Subjects;
