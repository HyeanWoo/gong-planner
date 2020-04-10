import React from 'react';
import dayjs from 'dayjs';
import './TodoModal.css';
import withModal from '../../HOC/withModal';
import nothing from '../../image/nothing.png'
import ChangeHistoryRoundedIcon from '@material-ui/icons/ChangeHistoryRounded';
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import { addTodos } from '../../firebase/todoFunction';

const TodoAddModal = ({subjectId, colName, date, handleCloseModal}) => {
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
    // console.log(todoName, todoCheck);
    // addTodos(collectionName, date, subjectId, todoId, todoCheck, todoName)
    const todoId = +dayjs();
    addTodos(colName, date, subjectId, todoId, todoCheck, todoName);
    handleCloseModal();
  }

  return(
    <div className="todo-modal">
      <div>할일 추가</div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="todoName">할일</label>
        <input type="text" id="todoName" onChange={handelChangeName} required/>
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
        <button type="submit" style={{float: "right"}}>추가</button>
      </form>
    </div>
  )
}

export default withModal("+할일추가")(TodoAddModal);