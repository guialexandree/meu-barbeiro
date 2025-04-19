import { mockLoadServicesResult } from '../../../domain/tests/service-mocks'
import * as Http from '../../../main/test/cypress/utils'

describe('Página de Clientes', () => {
  beforeEach(() => {
    localStorage.clear()
    Http.mockOk('GET', '/api/clientes*', mockLoadServicesResult).as('loadClients')
  })

  describe('Validações de estados da página', () => {
    it.skip('Deve iniciar a pagina com os valores corretos', () => {
      cy.visit('/clientes')

      cy.get('#page-title').should('have.text', 'Clientets')
      cy.get('#page-subtitle').should('have.text', 'Visualizar cadastro de clientes com informações de contato')
      cy.get('#services-input-search').should('have.value', '')
    })

    it.skip('Deve exibir o loading enquanto faz a busca dos clientes', () => {})

    it.skip('Deve buscar os clientes apenas uma vez ao abrir a tela', () => {
      cy.visit('/clientes')
      cy.wait('@loadClients')

      cy.get('@loadClients.all').should('have.length', 1)
    })

    it.skip('Deve exibir painel de erro caso a busca de clientes retorne com erro', () => {
      Http.mockBadRequestError('GET', '/api/clientes*').as('loadClientsError')

      cy.visit('/clientes')
      cy.wait('@loadClientsError')

      cy.get('#error-list').should('be.visible')
      cy.get('#reload-clients').should('be.visible')
    })

    it.skip('Deve exibir painel de lista vazia caso não tenha retornado resultados', () => {
      Http.mockOk('GET', '/api/clientes*', { success: true, data: [] }).as('loadClientsEmpty')

      cy.visit('/clientes')
      cy.wait('@loadClientsEmpty')

      cy.get('#empty-user-list').should('be.visible')
      cy.get('#empty-action-user-list').should('be.visible')
    })

    it.skip('Deve exibir corretamente os clientes retornados', () => {})
    it.skip('Deve ser possível abrir a tela de criação de novo cliente', () => {})
    it.skip('Deve ser possível abrir a tela de edição do cadastro de cliente', () => {})
  })
})