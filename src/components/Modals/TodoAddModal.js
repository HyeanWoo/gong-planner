import React from 'react';
import withModal from '../../HOC/withModal'

const TodoAddModal = () => {

  const handleChange = e => {
    e.preventDefault();
  }

  return(
    <div className="todo-modal">
      <div>할일 추가</div>
      <form onSubmit={handleChange}>
        <label htmlFor="todoName">할일</label>
        <input type="text" id="todoName"/>
        <p><label htmlFor="todoCheck">상태</label></p>
        <input type="radio" name="todoCheck" id="nothing" value=" "/>없
        <input type="radio" name="todoCheck" id="notyet" value="X"/>X
        <input type="radio" name="todoCheck" id="doing" value="Y"/>Y
        <input type="radio" name="todoCheck" id="done" value="O"/>O
      </form>
    </div>
  )
}

// delete, add, submit
const options = [false, true, false];
export default withModal("+할일추가",options)(TodoAddModal);