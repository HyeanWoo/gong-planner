const firebaseConfig = require('./firebase.json');
const firebase = require('firebase/app');
require('firebase/firestore');

firebase.initializeApp(firebaseConfig);

// 해당 날짜의 과목들 가져오기
async function getData(date) {
	const db = firebase.firestore();
	try {
		let subRef = await db.collection('testSubject').doc(date).get();
		let { subjects } = subRef.data();
		return subjects;
	} catch (err) {
		console.error('Error getting documents', err);
	}
}

// 날짜데이터 새로 생성
function createDate(date) {
	const db = firebase.firestore();
	db.collection('testSubject').doc(date).set({
		subjects: {
			isEmpty: true
		}
	});
}

// 과목데이터 새로 생성
function createSubject(collectionName,date, id, subjectName, subjectColor) {
  const db = firebase.firestore();
  const subjects = getData(collectionName, date);
  let inputData = {
      subjects: {
          ...subjects,
          [id]: {
              id: id,
              fold: false,
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

// 과목 정보(이름, 시간) 수정
// 시간정보 바뀌는 if문 나중에 수정필요
function updateSubject(date, dataType, id, changedData) {
	const db = firebase.firestore();
	if (dataType === 'subjectName') {
		db.collection('testSubject').doc(date).update({
			['subjects.' + id + '.subjectName']: changedData
		});
	} else if (dataType === 'totalElapsedTime') {
		db.collection('testSubject').doc(date).update({
			['subjects.' + id + '.totalElapsedTime']: changedData
		});
	} else {
		console.error('updateSubject', 'Wrong Data type input');
	}
}

// 과목 정보 삭제
function deleteSubject(date, id) {
	const db = firebase.firestore();
	db.collection('testSubject').doc(date).update({
		['subjects.' + id]: firebase.firestore.FieldValue.delete()
	});
}

//todos만 가져오기
async function getTodos(date, id) {
	const db = firebase.firestore();
	let todoRef = await db.collection('testSubject').doc(date).get();
	let { subjects } = todoRef.data();
	let { todos } = subjects[id];
	return todos;
}

// todo만 새로 추가
function addTodos(date, id, todoID, todoArg1, todoArg2) {
	const db = firebase.firestore();
	let unionData = { id: todoID, todoCheck: todoArg1, todoName: todoArg2 };
	db.collection('testSubject').doc(date).update({
		['subjects.' + id + '.todos']: firebase.firestore.FieldValue.arrayUnion(unionData)
	});
}

// todo 내용 수정
async function updateTodos(date, id, todoID, todoArg1, todoArg2) {
	const db = firebase.firestore();
	let changeData = { id: todoID, todoCheck: todoArg1, todoName: todoArg2 };
	let allTodos = await getTodos(date, id);
	let idx = allTodos.indexOf(allTodos.find((todo) => todo.id === todoID));
	allTodos[idx] = changeData;

	db.collection('testSubject').doc(date).update({
		['subjects.' + id + '.todos']: allTodos
	});
}

// todo 내용 삭제
function deleteTodos(date, id, todoID, todoArg1, todoArg2) {
	const db = firebase.firestore();
	let removeData = { id: todoID, todoCheck: todoArg1, todoName: todoArg2 };
	db.collection('testSubject').doc(date).update({
		['subjects.' + id + '.todos']: firebase.firestore.FieldValue.arrayRemove(removeData)
	});
}

const	subjects = {
		  1 : {
		    id: "1",
		    subjectName: '바른생활',
		    totalElapsedTime: '05:00:03',
		    subjectColor: '#00FFFF',
		    fold: false,
		    todos : [
		      {
		        id : "1-11",
		        todoName : "바르게 생활하기",
		        todoCheck : "1"
		      },
		      {
		        id : "1-22",
		        todoName : "로션 바르기",
		        todoCheck : "2"
		      },
		    ]
		  },
		  2 : {
		    id: "2",
		    subjectName: '슬기로운생활',
		    totalElapsedTime: '03:40:55',
		    subjectColor: '#FFFF00',
		    fold: false,
		    todos : [
		      {
		        id : "2-03",
		        todoName : "슬기롭게 생활하기",
		        todoCheck : "1"
		      },
		      {
		        id : "2-09",
		        todoName : "녹슬기",
		        todoCheck : "0"
		      },
		      {
		        id : "2-19",
		        todoName : "다슬기",
		        todoCheck : "2"
		      }
		    ]
		  },
		  3 : {
		    id: "3",
		    subjectName: '즐거운생활',
		    totalElapsedTime: '01:20:12',
		    subjectColor: '#FF00FF',
		    fold: false,
		    todos : [
		      {
		        id : "3-51",
		        todoName : "즐겁게 생활하기",
		        todoCheck : "0"
		      }
		    ]
		  }
}
    
createSubject("testSubject", "99.99.99", "3434", "휘끼휘끼", "#0693e3");