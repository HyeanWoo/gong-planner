import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const Todaylog = ({colName}) => {
  const editUrl = "/"+colName+"/edit";
  const settingUrl = "/"+colName+"/setting";

	return (
		<React.Fragment>
			<Link to={editUrl}>
				<Button>
					<span role='img' aria-label='edit' className='edit'>
						📝
					</span>
				</Button>
			</Link>
			<Link to={settingUrl}>
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
