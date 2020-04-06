import React, { useState } from 'react';
import _ from 'lodash';
import dayjs from 'dayjs';
import TodayDate from '../components/TodayDate';
import EditSubjectList from '../components/EditSubjectList';
import SubjectAddModal from '../components/Modals/SubjectAddModal';

const Edit = props => {
	const [ date, setDate ] = useState(dayjs());
	const goBack = () => {
		props.history.goBack();
	};

	const colName = _.isEmpty(props.match) ? 'testSubject' : props.match.params.colName;

	return (
		<div className='center edit'>
			<div className='row'>
				<div className='col s4 offset-s4'>This is Edit Page</div>
				<div className='col s1 offset-11'>
					<button onClick={goBack}>X</button>
				</div>
			</div>
			<div className='row'>
				<TodayDate date={date} onChangeDate={setDate} />
			</div>
			<div className='row'>
				{/* <EditSubjectList date={date} colName={colName} /> */}
				<EditSubjectList date="99.99.99" colName={colName} />
			</div>
			<div className='row'>
				<SubjectAddModal />
			</div>
		</div>
	);
};

export default Edit;
