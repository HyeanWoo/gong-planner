// type definitions for Cypress object "cy"
/// <reference types="cypress" />

// type definitions for custom commands like "createDefaultTodos"
/// <reference types="../support" />

// firebase
import firebaseConfig from '../../src/firebase/firebase.json';
import firebase from 'firebase/app';
import 'firebase/firestore';

import timeTable from '../../src/firebase/timeTableFunction';
import { getTodayData } from '../../src/firebase/todayFunction';

firebase.initializeApp(firebaseConfig);

describe('date', () => {
	it('getData', () => {
		cy.log(getTodayData('20.20.20'));
	});
});
