import React from 'react';
import withModal from '../../HOC/withModal';
import './TodoAddModal.css';
import nothing from '../../image/nothing.png'
import ChangeHistoryRoundedIcon from '@material-ui/icons/ChangeHistoryRounded';
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';

const TodoAddModal = () => {
  const [todoName, setTodoName] = React.useState("");
  const [todoCheck, setTodoCheck] = React.useState(0);

  const handelChangeName = e => {
    setTodoName(e.target.value);
  }
  
  const handelChangeCheck = e => {
    setTodoCheck(e.target.value);
  }

  const handleSubmit = e => {
    e.preventDefault();
    console.log(todoName, todoCheck);
  }

  return(
    <div className="todo-modal">
      <div>할일 추가</div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="todoName">할일</label>
        <input type="text" id="todoName" onChange={handelChangeName}/>
        <div className="state"><label htmlFor="todoCheck">상태</label></div>
        <div className="radio-input">
          <label>
            <input type="radio" name="todoCheck" id="nothing" value="0" onChange={handelChangeCheck}/>
            <img src={nothing} alt=""/>
          </label>
          <label>
            <input type="radio" name="todoCheck" id="notyet" value="1" onChange={handelChangeCheck}/>
            <ChangeHistoryRoundedIcon/>
          </label>
          <label>
            <input type="radio" name="todoCheck" id="doing" value="2" onChange={handelChangeCheck}/>
            <CheckCircleOutlineRoundedIcon/>
          </label>
          <label>
            <input type="radio" name="todoCheck" id="done" value="3" onChange={handelChangeCheck}/>
            <ClearRoundedIcon/>
          </label>
        </div>
      </form>
    </div>
  )
}

// delete, add, submit
const options = [false, true, false];
export default withModal("+할일추가",options)(TodoAddModal);