import { mockLoadAlertsResult } from '../../../domain/tests/alerts-mocks'
import * as Http from '../../../main/test/cypress/utils'

describe('Página de Serviços', () => {
  beforeEach(() => {
    localStorage.clear()
    localStorage.setItem('accessToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxYjZiZTVlZS1hNjViLTQwYmEtODBiOC1mY2I3NmIyMjZhNDUiLCJ1c2VybmFtZSI6Imd1aSIsIm5hbWUiOiJndWkiLCJpYXQiOjE3NDA5MzIxMjIsImV4cCI6MTc0MzUyNDEyMn0.MK9GnwNjt67_w6GmCRBJk1SgnD0j_wfRC99Snf7fmTs')
    Http.mockOk('GET', '/api/alerts', mockLoadAlertsResult).as('loadAlerts')
  })

  describe('Validações de estados da página', () => {
    it('Deve iniciar a pagina com os valores corretos', () => {
      cy.visit('/avisos')

      cy.get('#page-title').should('have.text', 'Avisos')
      cy.get('#page-subtitle').should('have.text', 'Configure avisos para exibir nas principais telas do app do cliente')
      cy.get('#home-alert-panel').should('be.visible')
      cy.get('#services-alert-panel').should('be.visible')
      cy.get('#history-alert-panel').should('be.visible')
    })

    it('Deve buscar os avisos apenas uma vez ao abrir a tela', () => {
      cy.visit('/avisos')
      cy.wait('@loadAlertts')

      cy.get('@loadAlertts.all').should('have.length', 1)
    })

    it.skip('Deve iniciar o painel com mensagem corretamente', () => {})
    it.skip('Deve iniciar o painel sem mensagem corretamente', () => {})

    it('Deve exibir painel de erro caso a busca de avisos retorne com erro', () => {
      Http.mockBadRequestError('GET', '/api/alerts').as('loadAlertsError')

      cy.visit('/avisos')
      cy.wait('@loadAlertsError')

      cy.get('#error-list').should('be.visible')
      cy.get('#reload-request').should('be.visible')
    })

    it.skip('Deve ser possível expandir/contrair os painéis', () => {})
    it.skip('Deve exibir o loading enquanto faz a busca dos avisos', () => {})
    it.skip('Deve ser possível abrir o formulário de aviso', () => {})
  })
})
