import React, { Component } from 'react';
import _ from 'lodash';
import SubjectList from './SubjectList';

class Subjects extends Component {
	state = {
		subjects : null
	};

	componentDidMount() {
    this.setState({
      subjects : this.props.subjects
    })
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

	render() {
		return (
			<div className='orange subjects'>
				<SubjectList subjects={this.props.subjects} setFold={this.setFold} />
			</div>
		);
	}
}

export default Subjects;
