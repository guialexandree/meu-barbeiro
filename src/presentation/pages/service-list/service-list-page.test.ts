import { mockLoadServicesResult } from '../../../domain/tests/service-mocks'
import * as Http from '../../../main/test/cypress/utils'

describe('Página de Serviços', () => {
  beforeEach(() => {
    localStorage.clear()
    Http.mockOk('GET', '/api/services*', mockLoadServicesResult).as('loadServices')
  })

  describe('Validações de estados da página', () => {
    it.skip('Deve iniciar a pagina com os valores corretos', () => {
      cy.visit('/servicos')

      cy.get('#page-title').should('have.text', 'Serviços')
      cy.get('#page-subtitle').should('have.text', 'Cadastro de serviços e tabela de preços')
      cy.get('#services-input-search').should('have.value', '')
    })

    it.skip('Deve exibir o loading enquanto faz a busca dos serviços', () => {})

    it('Deve buscar os serviços apenas uma vez ao abrir a tela', () => {
      cy.visit('/servicos')
      cy.wait('@loadServices')

      cy.get('@loadServices.all').should('have.length', 1)
    })

    it('Deve exibir painel de erro caso a busca de serviços retorne com erro', () => {
      Http.mockBadRequestError('GET', '/api/services*').as('loadServicesError')

      cy.visit('/servicos')
      cy.wait('@loadServicesError')

      cy.get('#error-list').should('be.visible')
      cy.get('#reload-services').should('be.visible')
    })

    it('Deve exibir painel de lista vazia caso não tenha retornado resultados', () => {
      Http.mockOk('GET', '/api/services*', { success: true, data: [] }).as('loadServicesEmpty')

      cy.visit('/servicos')
      cy.wait('@loadServicesEmpty')

      cy.get('#empty-service-list').should('be.visible')
      cy.get('#empty-action-service-list').should('be.visible')
    })

    it.skip('Deve exibir corretamente os serviços retornados', () => {})

    it('Quando filtro de pesquisa não retornar resultados exibir painel de filtros não encontrado', () => {
      cy.visit('/servicos')

      cy.get('#services-input-search').type('xyz')
      cy.wait('@loadServices')
      cy.get('#empty-service-list').should('be.visible')
    })

    it.skip('Deve ser possível abrir a tela de criação de serviço', () => {})
    it.skip('Deve ser possível abrir a tela de edição do serviço', () => {})
  })

  describe.skip('Validações dos filtros', () => {
    it('Deve filtrar o status \'Somente ativos\' corretamente', () => {
      Http.mockOk('GET', '/api/services*', {
        statusCode: 200,
        body: [{ id: 1, name: 'Corte de cabelo', status: 'ativo' }],
      }).as('getActiveServices')

      cy.get('#service-filter-status-autowidth').select('ativo')
      cy.wait('@getActiveServices')
      cy.get('#service-list').should('contain', 'Corte de cabelo')
    })

    it.skip('Deve filtrar controlar a visibilidade dos filtros', () => {})

    it.skip('Deve filtrar o status \'Somente inativo\' corretamente', () => {
      Http.mockOk('GET', '/api/services*', {
        statusCode: 200,
        body: [{ id: 1, name: 'Corte de cabelo', status: 'inativo' }],
      }).as('getActiveServices')

      cy.get('#service-filter-status-autowidth').select('inativo')
      cy.wait('@getActiveServices')
      cy.get('#service-list').should('contain', 'Corte de cabelo')
    })
    it.skip('Deve filtrar o status \'Exibir todos\' corretamente', () => {
      Http.mockOk('GET', '/api/services*', {
        statusCode: 200,
        body: [{ id: 1, name: 'Corte de cabelo', status: 'ativo' }],
      }).as('getActiveServices')

      cy.get('#service-filter-status-autowidth').select('ativo')
      cy.wait('@getActiveServices')
      cy.get('#service-list').should('contain', 'Corte de cabelo')
    })

    it('Ao pesquisar por serviços devem ser exibidos apenas resultados com o filtro informado', () => {
      Http.mockOk('GET', '/api/services*', {
        statusCode: 200,
        body: [{ id: 1, name: 'Corte de cabelo', status: 'ativo' }],
      }).as('searchServices')

      cy.get('#services-input-search').type('cabelo')
      cy.wait('@searchServices')
      cy.get('#service-list').should('contain', 'Corte de cabelo')
    })
  })
})
