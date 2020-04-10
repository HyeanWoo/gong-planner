import React from 'react';
import withModal from '../../HOC/withModal';
import './TodoModal.css';
import nothing from '../../image/nothing.png'
import ChangeHistoryRoundedIcon from '@material-ui/icons/ChangeHistoryRounded';
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';

const TodoEditModal = () => {
  const handleChange = e => {
    e.preventDefault();
  }

  return(
    <div className="todo-modal">
      <div>할일 편집</div>
      <form onSubmit={handleChange}>
        <label htmlFor="todoName">할일</label>
        <input type="text" id="todoName" required/>
        <div className="state"><label htmlFor="todoCheck">상태</label></div>
        <div className="radio-input">
          <label>
            <input type="radio" name="todoCheck" id="nothing" value=" "/>
            <img src={nothing} alt=""/>
          </label>
          <label>
            <input type="radio" name="todoCheck" id="notyet" value="X"/>
            <ChangeHistoryRoundedIcon/>
          </label>
          <label>
            <input type="radio" name="todoCheck" id="doing" value="Y"/>
            <CheckCircleOutlineRoundedIcon/>
          </label>
          <label>
            <input type="radio" name="todoCheck" id="done" value="O"/>
            <ClearRoundedIcon/>
          </label>
        </div>
      </form>
    </div>
  )
}

export default withModal("*")(TodoEditModal);