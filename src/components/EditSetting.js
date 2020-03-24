import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const Todaylog = () => {
	return (
		<React.Fragment>
			<Button>
				<span role='img' aria-label='edit' className='edit'>
					<Link to="/edit">📝</Link>
				</span>
			</Button>
			<Button>
				<span role='img' aria-label='setting' className='setting'>
					<Link to="/setting">⚙️</Link>
				</span>
			</Button>
		</React.Fragment>
	);
};

export default Todaylog;
