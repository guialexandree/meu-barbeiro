import { mockLoadServicesResult } from '../../../domain/tests/service-mocks'
import * as Http from '../../../main/test/cypress/utils'

describe('Página de Serviços', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe('Validações de estados da página', () => {
    it('Deve iniciar a pagina com os valores corretos', () => {
      Http.mockOk('GET', '/api/services', mockLoadServicesResult).as('loadServices')

      cy.visit('/servicos')

      cy.get('#page-title').should('have.text', 'Serviços')
      cy.get('#page-subtitle').should('have.text', 'Cadastro de serviços e tabela de preços')
      cy.get('#services-input-search').should('have.value', '')
    })

    it('Deve exibir painel de erro caso a busca de serviços retorne com erro', () => {
      Http.mockBadRequestError('GET', '/api/services').as('loadServicesError')

      cy.visit('/servicos')
      cy.wait('@loadServicesError')

      cy.get('#error-list').should('be.visible')
      cy.get('#reload-services').should('be.visible')
    })

    it('Deve exibir painel de lista vazia caso não tenha retornado resultado da API', () => {
      Http.mockOk('GET', '/api/services', { success: true, data: [] }).as('loadServicesEmpty')

      cy.visit('/servicos')
      cy.wait('@loadServicesEmpty')

      cy.get('#empty-services-list').should('be.visible')
      cy.get('#empty-action-services-list').should('be.visible')
    })

    it('Quando filtro de pesquisa não retornar resultados exibir painel de filtros não encontrado', () => {
      cy.intercept('GET', '/api/services?search=xyz', {
        statusCode: 200,
        body: mockLoadServicesResult,
      }).as('searchNoResults')
      cy.visit('/servicos')

      cy.get('#services-input-search').type('xyz')
      cy.wait('@searchNoResults')
      cy.get('#empty-services-list').should('be.visible')
    })
  })

  describe.skip('Validações dos filtros', () => {
    it('Quando filtrar por status devem ser exibidos apenas resultados com o filtro informado', () => {
      cy.intercept('GET', '/api/services?status=ativo', {
        statusCode: 200,
        body: [{ id: 1, name: 'Corte de cabelo', status: 'ativo' }],
      }).as('getActiveServices')

      cy.get('#filter-status').select('ativo')
      cy.wait('@getActiveServices')
      cy.get('#services-list').should('contain', 'Corte de cabelo')
    })

    it('Ao pesquisar por serviços devem ser exibidos apenas resultados com o filtro informado', () => {
      cy.intercept('GET', '/api/services?search=cabelo', {
        statusCode: 200,
        body: [{ id: 1, name: 'Corte de cabelo', status: 'ativo' }],
      }).as('searchServices')

      cy.get('#services-input-search').type('cabelo')
      cy.wait('@searchServices')
      cy.get('#services-list').should('contain', 'Corte de cabelo')
    })
  })
})
