import React from 'react';
import Button from '@material-ui/core/Button';

const Todaylog = () => {
	return (
		<React.Fragment>
			<Button>
				<span role='img' aria-label='edit' className='edit'>
					📝
				</span>
			</Button>
			<Button>
				<span role='img' aria-label='setting' className='setting'>
					⚙️
				</span>
			</Button>
		</React.Fragment>
	);
};

export default Todaylog;
