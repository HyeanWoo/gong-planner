import firebase from './index';

// 해당 날짜 정보 가져오기
// 날짜 정보가 없으면 새로 만듦
export async function getTodayData(collectionName, date) {
	const db = firebase.firestore();
	const doc = db.collection(collectionName).doc(date);
	try {
		let subRef = await doc.get();

		if (!subRef.exists) {
			await doc.set({
				dDay: 0,
				score: 0,
				totalStudyTime: 0,
				wordToday: '',
				subjects: {},
				timeTable: []
			});
			subRef = await doc.get();
		}

		console.log('Get today docs OK');
		return subRef.data();
	} catch (err) {
		console.error('Error getting documents', err);
	}
}

// TodayLog 수정
export function updateTodayLog(collectionName, date, dataType, changeData) {
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
      let data = Number(changeData);
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