import { mockLoadAlertsResult } from '../../../domain/tests/alerts-mocks'
import * as Http from '../../../main/test/cypress/utils'

describe('Página de Serviços', () => {
  beforeEach(() => {
    localStorage.clear()
    localStorage.setItem('accessToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxYjZiZTVlZS1hNjViLTQwYmEtODBiOC1mY2I3NmIyMjZhNDUiLCJ1c2VybmFtZSI6Imd1aSIsIm5hbWUiOiJndWkiLCJpYXQiOjE3NDA5MzIxMjIsImV4cCI6MTc0MzUyNDEyMn0.MK9GnwNjt67_w6GmCRBJk1SgnD0j_wfRC99Snf7fmTs')
  })

  describe('Validações de estados da página', () => {
    it('Deve iniciar a pagina com os valores corretos', () => {
      Http.mockOk('GET', '/api/alerts', mockLoadAlertsResult).as('loadAlerts')

      cy.visit('/avisos')

      cy.get('#page-title').should('have.text', 'Avisos')
      cy.get('#page-subtitle').should('have.text', 'Configure avisos para exibir nas principais telas do app do cliente')
      cy.get('#home-alert-panel').should('be.visible')
      cy.get('#services-alert-panel').should('be.visible')
      cy.get('#history-alert-panel').should('be.visible')
    })

    it('Deve exibir painel de erro caso a busca de avisos retorne com erro', () => {
      Http.mockBadRequestError('GET', '/api/alerts').as('loadAlertsError')

      cy.visit('/avisos')
      cy.wait('@loadAlertsError')

      cy.get('#error-list').should('be.visible')
      cy.get('#reload-request').should('be.visible')
    })
  })
})
