import firebase from './index'

//todos만 가져오기
export async function getTodos(date, id) {
  const db = firebase.firestore();
  try {
    let todoRef = await db.collection('testSubject').doc(date).get();
    let { subjects } = todoRef.data();
    let { todos } = subjects[id];
    console.log("Get Todos OK");
    return todos;
  } catch(err) {
    console.log("Get Todos Error", err);
  }
}

// todo만 새로 추가
export function addTodos(date, id, todoID, todoCheck, todoName) {
  const db = firebase.firestore();
  let unionData = { id: todoID, todoCheck: todoCheck, todoName: todoName };
  db.collection('testSubject').doc(date).update({
    ['subjects.'+id+".todos"] : firebase.firestore.FieldValue.arrayUnion(unionData)
  })
  .then(function() {
    console.log("Add Todos OK");
  })
  .catch(function(err){
    console.log('Add Todos Error', err);
  }); 
}

// todo 내용 수정
export async function updateTodos(date, id, todoID, todoCheck, todoName) {
  const db = firebase.firestore();
  let changeData = { id: todoID, todoCheck: todoCheck, todoName: todoName };
  let allTodos = await getTodos(date, id);
  let idx = allTodos.indexOf(allTodos.find( todo => todo.id === todoID));
  allTodos[idx] = changeData;

  db.collection('testSubject').doc(date).update({
    ['subjects.'+id+".todos"] : allTodos
  })
  .then(function() {
    console.log("Update Todos OK");
  })
  .catch(function(err){
    console.log('Update Todos Error', err);
  }); 
}

// todo 내용 삭제
export function deleteTodos(date, id, todoID, todoCheck, todoName) {
  const db = firebase.firestore();
  let removeData = { id: todoID, todoCheck: todoCheck, todoName: todoName };
  db.collection('testSubject').doc(date).update({
    ['subjects.'+id+".todos"] : firebase.firestore.FieldValue.arrayRemove(removeData)
  })
  .then(function() {
    console.log("Delete Todos OK");
  })
  .catch(function(err){
    console.log('Delete Todos Error', err);
  }); 
}