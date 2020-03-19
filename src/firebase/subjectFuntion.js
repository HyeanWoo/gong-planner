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

// 해당 날짜의 과목중 아이디가 일치하는거 가져오기
// export async function getDataById(date, id) {
//   const db = firebase.firestore();
//   try {
//     let subRef = await db.collection("testSubject").where('id', '==', id).get();
//     let subject = subRef.data();
//     return subject;
//   }
//   catch(err) {
//     console.error('Error getting documents',err);
//   }
// }

// 날짜데이터 새로 생성
export function createDate(date) {
  const db = firebase.firestore();
  db.collection('testSubject').doc(date).set({subjects:{isEmpty:true}});
}

// 과목데이터 새로 생성
export function createSubject(date, id, subjectName, subjects) {
  const db = firebase.firestore();
  let inputData = {
    subjects: {
      ...subjects,
      [id] : {
        id : id,
        subjectName : subjectName,
        totalElapsedTime : "00:00:00"
      }
    }
  };

  db.collection('testSubject').doc(date).set(inputData);
}

// 과목 정보(이름, 시간) 수정
// export function updateSubject(date, id, changedData) {
//   const db = firebase.firestore();
//   if(typeof(changedData) === "string") {
//     findById(date, id);
//     db.collection('testSubject').doc(date).update({
//       'subjects.33.subjectName' : changedData
//     });
//   } else if(typeof(changedData) === "number") {
//     // 공부시간 수정
//   } else {
//     console.error("updateSubject","Wrong Data type input")
//   }
// }

// async function findById(date, id) {
//   let sub = await getDataById(date, id);
//   console.log(sub);
// }