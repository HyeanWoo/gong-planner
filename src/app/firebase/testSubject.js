const firebaseConfig = require('./firebase.json');
const firebase = require('app/firebase/app');
require('app/firebase/firestore');

firebase.initializeApp(firebaseConfig);

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

// TodayLog 수정
function updateTodayLog(collectionName, date, dataType, changeData) {
  const db = firebase.firestore();
  const doc = db.collection(collectionName).doc(date);

  try {
    if(dataType==='WORD_TODAY'){
      doc.update({
        wordToday: changeData
      })
    } else if(dataType==='D_DAY'){
      doc.update({
        dDay: changeData
      })
    } else if(dataType==='SCORE_PROGRESS'){
      let data = parseFloat(changeData);
      doc.update({
        score: data
      })
    } else if(dataType==='TOTAL_STUDY_TIME'){
      let data = number(changeData)
      doc.update({
        totalStudyTime: data
      })
    } else {
      console.error('updateTodayLog', 'Wrong Data type input');
    }
    console.log('Update TodayLog OK');
  } catch (err) {
    console.log('Update TodayLog Error', err);
  }
}

console.log("node test ready");
// updateTodayLog("testSubject", "20.04.20", "WORD_TODAY", "으쌰라으쌰")
// updateTodayLog("testSubject", "20.04.20", "D_DAY", "2030. 03. 03.")
// updateTodayLog("testSubject", "20.04.20", "SCORE_PROGRESS", "1.2")
// updateTodayLog("testSubject", "20.04.20", "TOTAL_STUDY_TIME", "13:11:12")