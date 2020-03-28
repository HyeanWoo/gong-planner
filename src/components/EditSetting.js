import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const Todaylog = () => {
	return (
		<React.Fragment>
			<Link to='/edit'>
				<Button>
					<span role='img' aria-label='edit' className='edit'>
						📝
					</span>
				</Button>
			</Link>
			<Link to='/setting'>
				<Button>
					<span role='img' aria-label='setting' className='setting'>
						⚙️
					</span>
				</Button>
			</Link>
		</React.Fragment>
	);
};

export default Todaylog;
