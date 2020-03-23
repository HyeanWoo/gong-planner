import firebase from './index'

// 해당 날짜의 과목들 가져오기
export async function getData(date) {
  const db = firebase.firestore();
  try {
    let subRef = await db.collection("testSubject").doc(date).get();
    let {subjects} = subRef.data();
    console.log("Get Sujects docs OK");
    return subjects;
  }
  catch(err) {
    console.error('Error getting documents',err);
  }
}

// 날짜'문서' 새로 생성
export function createDate(date) {
  const db = firebase.firestore();
  db.collection('testSubject').doc(date).set({subjects:{isEmpty:true}})
  .then(function() {
    console.log("Create Date Doc OK");
  })
  .catch(function(err){
    console.log('Create Date Error', err);
  });
}

// 과목'필드' 새로 생성
export function createSubject(date, id, subjectName, subjects, todos) {
  const db = firebase.firestore();
  let inputData = {
      subjects: {
          ...subjects,
          [id]: {
              id: id,
              subjectName: subjectName,
              totalElapsedTime: "00:00:00",
              todos : todos
          }
      }
  };

  db.collection('testSubject').doc(date).set(inputData)
  .then(function() {
    console.log("Create Subjects Field OK");
  })
  .catch(function(err){
    console.log('Create Subjects Error', err);
  });
}

// 과목 '필드'(이름, 시간) 수정
export function updateSubject(date, dataType, id, changedData) {
  const db = firebase.firestore();
  try {
    if(dataType === "subjectName") {
      db.collection('testSubject').doc(date).update({
        ['subjects.'+id+'.subjectName'] : changedData
      });
    } else if(dataType === "totalElapsedTime") {
      db.collection('testSubject').doc(date).update({
        ['subjects.'+id+'.totalElapsedTime'] : changedData
      });
    } else {
      console.error("updateSubject","Wrong Data type input")
    }
    console.log("Update Subjects OK");
  } catch(err) {
    console.log("Update Subjects Error", err);
  }
}

// 과목 '필드' 삭제
export function deleteSubject(date, id) {
  const db = firebase.firestore();
  db.collection('testSubject').doc(date).update({
    ['subjects.'+id] : firebase.firestore.FieldValue.delete()
  })
  .then(function() {
    console.log("Delete Subject OK");
  })
  .catch(function(err){
    console.log('Delete Subject Error', err);
  });
}

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