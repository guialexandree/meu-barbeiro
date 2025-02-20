import { _mockLoadServicesResult } from '../../../domain/tests/service-mocks'
import * as Http from '../../../main/test/cypress/utils'

describe('Página de Serviços', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe('Validações de estados da página', () => {
    it('Deve iniciar a pagina com os valores corretos', () => {
      Http.mockOk('GET', '/api/services', _mockLoadServicesResult).as('loadServices')

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

    it('Deve exibir painel de lista vazia caso não tenha retornado resultado na pesquisa', () => {
      Http.mockOk('GET', '/api/services', { success: true, data: [] }).as('loadServicesEmpty')

      cy.visit('/servicos')
      cy.wait('@loadServicesEmpty')

      cy.get('#empty-services-list').should('be.visible')
      cy.get('#empty-action-services-list').should('be.visible')
    })

    it.skip('Quando filtro de pesquisa não retornar resultados exibir painel de resultado vazio', () => {
      cy.intercept('GET', '/api/services?search=xyz', {
        statusCode: 200,
        body: [],
      }).as('searchNoResults')

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

  describe('Criação de novo serviço', () => {
    it('Deve iniciar com os valores corretos', () => {
      cy.visit('/servicos')
      cy.get('#create-service-button').click()
      cy.get('#service-name').should('have.value', '')
      cy.get('#service-description').should('have.value', '')
      // cy.get('#service-price').should('have.value', '0')
      // cy.get('#service-time-execution').should('have.value', '20')
      // cy.get('#service-status').should('have.value', 'ativo')
    })

    it('Não deve ser possível cadastrar serviços com nome com menos de 3 caracteres', () => {
      Http.mockOk('GET', '/api/services', _mockLoadServicesResult)
      cy.visit('/servicos')
      cy.get('#create-service-button').click()
      cy.get('#service-name').type('AB')

      cy.get('#save-service-button').click()

      cy.get('#service-name-helper-text').should('contain', 'O nome deve ter no mínimo 3 caracteres')
    })

    it('Não deve ser possível cadastrar serviço com o mesmo nome', () => {
      Http.mockBadRequestError('POST', '/api/services', {
        success: false,
        error: 'Já existe um serviço com esse nome',
        data: null,
      }).as('createServiceDuplicate')
      cy.visit('/servicos')

      cy.get('#create-service-button').click()
      cy.get('#service-name').type('Corte de cabelo')
      cy.get('#save-service-button').click()
      cy.wait('@createServiceDuplicate')

      cy.get('#service-name-helper-text').should('contain', 'Já existe um serviço com esse nome')
    })

    it('Deve exibir erro no helper do input nome do Serviço caso ocorram erros com o nome', () => {
      cy.visit('/servicos')
      cy.get('#create-service-button').click()
      cy.get('#service-name').type('AB')
      cy.get('#save-service-button').click()
      cy.get('#service-name-helper-text').should('contain', 'O nome deve ter no mínimo 3 caracteres')
    })

    it('Quando fechada a tela de cadastro os valores devem ser resetados', () => {
      cy.get('#service-name').type('Corte de cabelo')
      cy.get('#close-service-form-button').click()
      cy.get('#create-service-button').click()
      cy.get('#service-name').should('have.value', '')
    })

    it('Ao criar um serviço com sucesso o mesmo deve ser adicionado ao topo da lista de serviços', () => {
      Http.mockOk('GET', '/api/services', _mockLoadServicesResult)
      Http.mockOk('POST', '/api/services', {
        success: true,
        error: '',
        message: 'Serviço criado com sucesso',
        data: { id: 'd9755e37-4470-416a-b5bd-b02fa73e1748', name: 'any_name', status: 'ativo' },
      }).as('createService')
      cy.visit('/servicos')

      cy.get('#create-service-button').click()
      cy.get('#service-name').type('any_name')
      cy.get('#save-service-button').click()
      cy.wait('@createService')

      cy.get('#services-list').children().first().should('have.id', 'service-d9755e37-4470-416a-b5bd-b02fa73e1748')
    })
  })
})
