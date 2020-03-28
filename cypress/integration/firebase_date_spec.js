// type definitions for Cypress object "cy"
/// <reference types="cypress" />

// type definitions for custom commands like "createDefaultTodos"
/// <reference types="../support" />

// firebase
import firebaseConfig from '../../src/firebase/firebase.json';
import firebase from 'firebase/app';
import 'firebase/firestore';

firebase.initializeApp(firebaseConfig);


// 해당 날짜의 과목들 가져오기
async function getData(collection, date) {
	const db = firebase.firestore();
	try {
		const ref = await db.collection(collection).doc(date).get();
		return ref.data();
	} catch (err) {
		console.error('Error getting documents', err);
	}
}

// 날짜데이터 새로 생성
async function createDate(collection, date) {
	const db = firebase.firestore();
	try {
		await db.collection(collection).doc(date).set({
			wordToday: "",
			dDay: 0,
			score: 0,
			totalStudyTime: 0,
			subjects: {
				isEmpty: true
			},
			timeTable: {
				isEmpty: true
			}
		}, {merge: true});
	} catch (err) {
		console.error('생성실패, 만드는데 에러남ㅎ', err);
		return null;
	}
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



describe('date', () => {
	const collectionName = 'testIndex';
	const shortDate = '20.03.27';
	it('createDate', async () => {
		// const date = await createDate(collectionName, shortDate);
		console.log();
	})
	it('getData', () => {
		cy.log(getData('testIndex', shortDate));
	});
});
