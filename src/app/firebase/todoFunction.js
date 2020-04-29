import firebase from './index';

//todos만 가져오기
export async function getTodos(collectionName, date, subjectId) {
  const db = firebase.firestore();
  try {
    let todoRef = await db.collection(collectionName).doc(date).get();
    let { subjects } = todoRef.data();
    let { todos } = subjects[subjectId];
    console.log('Get Todos OK');
    return todos;
  } catch (err) {
    console.log('Get Todos Error', err);
  }
}

// todo만 새로 추가
export function addTodos(
  collectionName,
  date,
  subjectId,
  todoId,
  todoCheck,
  todoName
) {
  const db = firebase.firestore();
  let unionData = { id: todoId, todoCheck: todoCheck, todoName: todoName };
  return db
    .collection(collectionName)
    .doc(date)
    .update({
      ['subjects.' +
      subjectId +
      '.todos']: firebase.firestore.FieldValue.arrayUnion(unionData),
    })
    .then(function () {
      console.log('Add Todos OK');
    })
    .catch(function (err) {
      console.log('Add Todos Error', err);
    });
}

// todo 내용 수정
export async function updateTodos(
  collectionName,
  date,
  subjectId,
  todoId,
  todoCheck,
  todoName
) {
  const db = firebase.firestore();
  let changeData = { id: todoId, todoCheck: todoCheck, todoName: todoName };
  let allTodos = await getTodos(collectionName, date, subjectId);
  let idx = allTodos.indexOf(allTodos.find((todo) => todo.id === todoId));
  allTodos[idx] = changeData;

  return db
    .collection(collectionName)
    .doc(date)
    .update({
      ['subjects.' + subjectId + '.todos']: allTodos,
    })
    .then(function () {
      console.log('Update Todos OK');
    })
    .catch(function (err) {
      console.log('Update Todos Error', err);
    });
}

// todo 내용 삭제
export function deleteTodos(
  collectionName,
  date,
  subjectId,
  todoId,
  todoCheck,
  todoName
) {
  const db = firebase.firestore();
  let removeData = { id: todoId, todoCheck: todoCheck, todoName: todoName };
  return db
    .collection(collectionName)
    .doc(date)
    .update({
      ['subjects.' +
      subjectId +
      '.todos']: firebase.firestore.FieldValue.arrayRemove(removeData),
    })
    .then(function () {
      console.log('Delete Todos OK');
    })
    .catch(function (err) {
      console.log('Delete Todos Error', err);
    });
}
