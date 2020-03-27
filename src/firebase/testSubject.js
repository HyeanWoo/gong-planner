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
function createSubject(date, id, subjectName, subjects, todos) {
	const db = firebase.firestore();
	let inputData = {
		subjects: {
			...subjects,
			[id]: {
				id: id,
				subjectName: subjectName,
				totalElapsedTime: '00:00:00',
				todos: todos
			}
		}
	};

	db.collection('testSubject').doc(date).set(inputData);
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

// getData("20.20.20").then((subjects) => {
//     console.log(subjects)
// });

// updateSubject("20.20.20", "33", "편안한생활");

// deleteSubject("20.03.21", "33")

// getTodos("99.99.99", "123").then( sub => {
//   console.log(sub);
// });

const changedTodos = [
	{
		id: '123-32',
		todoCheck: '0',
		todoName: '산딸기빙수'
	},
	{
		id: '123-71',
		todoCheck: '1',
		todoName: '콩떡빙수'
	}
];

// createSubject('20.03.21', '123', '빨강빨강딸기', {}, changedTodos);

// deleteTodos("99.99.99", "123", '콩떡빙수');

// addTodos('99.99.99', '123', '2', '콩떡빙수');

// updateTodos("99.99.99","123", "123-71", "2", "멜론빙수");


async function getCollection(name) {
  const db = firebase.firestore();
  let all = db.collection(name);
  let snapshot = await all.get();

  return snapshot.docs;
}

getCollection('testSubject');