import firebase from './index'

// 해당 날짜의 과목들 가져오기
export async function getData(date) {
  const db = firebase.firestore();
  try {
    let subRef = await db.collection("testSubject").doc(date).get();
    let {subjects} = subRef.data();
    return subjects;
  }
  catch(err) {
    console.error('Error getting documents',err);
  }
}

// 날짜'문서' 새로 생성
export function createDate(date) {
  const db = firebase.firestore();
  db.collection('testSubject').doc(date).set({subjects:{isEmpty:true}});
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

  db.collection('testSubject').doc(date).set(inputData);
}

// 과목 '필드'(이름, 시간) 수정
export function updateSubject(date, id, changedData) {
  const db = firebase.firestore();
  if(typeof(changedData) === "string") {
    db.collection('testSubject').doc(date).update({
      ['subjects.'+id+'.subjectName'] : changedData
    });
  } else if(typeof(changedData) === "number") {
    db.collection('testSubject').doc(date).update({
      ['subjects.'+id+'.totalElapsedTime'] : changedData
    });
  } else {
    console.error("updateSubject","Wrong Data type input")
  }
}

// 과목 '필드' 삭제
export function deleteSubject(date, id) {
  const db = firebase.firestore();
  db.collection('testSubject').doc(date).update({
    ['subjects.'+id] : firebase.firestore.FieldValue.delete()
  });  
}
//todos만 가져오기
export async function getTodos(date, id) {
  const db = firebase.firestore();
  let todoRef = await db.collection('testSubject').doc(date).get();
  let { subjects } = todoRef.data();
  let { todos } = subjects[id];
  return todos;
}

// todo만 새로 추가
export function addTodos(date, id, todoID, todoArg1, todoArg2) {
  const db = firebase.firestore();
  let unionData = { id: todoID, todoCheck: todoArg1, todoName: todoArg2 };
  db.collection('testSubject').doc(date).update({
    ['subjects.'+id+".todos"] : firebase.firestore.FieldValue.arrayUnion(unionData)
  });  
}

// todo 내용 수정
export async function updateTodos(date, id, todoID, todoArg1, todoArg2) {
  const db = firebase.firestore();
  let changeData = { id: todoID, todoCheck: todoArg1, todoName: todoArg2 };
  let allTodos = await getTodos(date, id);
  let idx = allTodos.indexOf(allTodos.find( todo => todo.id === todoID));
  allTodos[idx] = changeData;

  db.collection('testSubject').doc(date).update({
    ['subjects.'+id+".todos"] : allTodos
  }); 
}

// todo 내용 삭제
export function deleteTodos(date, id, todoID, todoArg1, todoArg2) {
  const db = firebase.firestore();
  let removeData = { id: todoID, todoCheck: todoArg1, todoName: todoArg2 };
  db.collection('testSubject').doc(date).update({
    ['subjects.'+id+".todos"] : firebase.firestore.FieldValue.arrayRemove(removeData)
  });  
}