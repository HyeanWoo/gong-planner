// type definitions for Cypress object "cy"
/// <reference types="cypress" />

// type definitions for custom commands like "createDefaultTodos"
/// <reference types="../support" />

describe('date 화살표 테스트', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('5번 왼쪽 클릭', () => {
    for (let i = 0; i < 5; ++i) {
      cy.wait(1000)
        .get('svg.prevDate')
        .click()
    }
  })

  it('5번 오른쪽 클릭', () => {
    for (let i = 0; i < 5; ++i) {
      cy.wait(1000)
        .get('svg.nextDate')
        .click()
    }
  })
})