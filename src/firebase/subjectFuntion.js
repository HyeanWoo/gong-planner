import firebase from './index'

// 해당 날짜의 과목들 가져오기
export async function getData(collectionName, date) {
  const db = firebase.firestore();
  try {
    let subRef = await db.collection(collectionName).doc(date).get();
    let {subjects} = subRef.data();
    console.log("Get Sujects docs OK");
    return subjects;
  }
  catch(err) {
    console.error('Error getting documents',err);
  }
}

// 날짜'문서' 새로 생성
export function createDate(collectionName,date) {
  const db = firebase.firestore();
  db.collection(collectionName).doc(date).set({subjects:{}})
  .then(function() {
    console.log("Create Date Doc OK");
  })
  .catch(function(err){
    console.log('Create Date Error', err);
  });
}

// 과목'필드' 새로 생성
export async function createSubject(collectionName,date, id, subjectName, subjectColor) {
  const db = firebase.firestore();
  const subjects = await getData(collectionName, date);
  let inputData = {
      subjects: {
          ...subjects,
          [id]: {
              id: id,
              fold: true,
              subjectColor: subjectColor,
              subjectName: subjectName,
              totalElapsedTime: "00:00:00",
              todos : []
          }
      }
  };

  db.collection(collectionName).doc(date).set(inputData)
  .then(function() {
    console.log("Create Subjects Field OK");
  })
  .catch(function(err){
    console.log('Create Subjects Error', err);
  });
}

// 과목 '필드'(이름, 시간) 수정
export function updateSubject(collectionName, date, dataType, id, changedData1, changedData2) {
  const db = firebase.firestore();
  try {
    if(dataType === "EDIT_SUBJECT") {
      db.collection(collectionName).doc(date).update({
        ['subjects.'+id+'.subjectName'] : changedData1,
        ['subjects.'+id+'.subjectColor'] : changedData2
      });
    } else if(dataType === "EDIT_TIME") {
      db.collection(collectionName).doc(date).update({
        ['subjects.'+id+'.totalElapsedTime'] : changedData1
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
export function deleteSubject(collectionName, date, id) {
  const db = firebase.firestore();
  db.collection(collectionName).doc(date).update({
    ['subjects.'+id] : firebase.firestore.FieldValue.delete()
  })
  .then(function() {
    console.log("Delete Subject OK");
  })
  .catch(function(err){
    console.log('Delete Subject Error', err);
  });
}