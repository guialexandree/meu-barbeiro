import { mockLoadServicesResult } from '../../../domain/tests/service-mocks'
import * as Http from '../../../main/test/cypress/utils'

describe('Página de Serviços', () => {
  beforeEach(() => {
    localStorage.clear()
    localStorage.setItem('accessToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxYjZiZTVlZS1hNjViLTQwYmEtODBiOC1mY2I3NmIyMjZhNDUiLCJ1c2VybmFtZSI6Imd1aSIsIm5hbWUiOiJndWkiLCJpYXQiOjE3NDA5MzIxMjIsImV4cCI6MTc0MzUyNDEyMn0.MK9GnwNjt67_w6GmCRBJk1SgnD0j_wfRC99Snf7fmTs')
  })

  describe('Validações de estados da página', () => {
    it('Deve iniciar a pagina com os valores corretos', () => {
      cy.visit('/servico/criar-novo')

      cy.get('#page-title').should('have.text', 'Cadastro de Serviço')
      cy.get('#page-subtitle').should('have.text', 'Crie serviços e ajuste preços para serem exibidos no app do cliente')
      cy.get('#service-create-form').should('be.visible')
      cy.get('#service-name').should('have.value', '')
      cy.get('#service-description').should('have.value', '')
      // cy.get('#service-price').should('have.value', '0')
      // cy.get('#service-time-execution').should('have.value', '20')
      // cy.get('#service-status').should('have.value', 'ativo')
    })
  })

  describe('Criação de novo serviço', () => {
    it('Não deve ser possível cadastrar serviços com nome com menos de 3 caracteres', () => {
      cy.get('#service-name').type('AB')

      cy.get('#save-service-button').click()

      cy.get('#service-name-helper-text').should('contain', 'O nome deve ter no mínimo 3 caracteres')
    })

    it('Não deve ser possível cadastrar serviço com um nome já existente', () => {
      Http.mockBadRequestError('POST', '/api/services', {
        success: false,
        error: 'Já existe um serviço com esse nome',
        data: null,
      }).as('createServiceDuplicate')
      cy.get('#service-name').clear().type('CORTE NA REGUA')
      cy.get('#service-description').clear().type('CORTE ATUALIZADO')

      cy.get('#save-service-button').click()
      cy.wait('@createServiceDuplicate')

      cy.get('#service-name-helper-text').should('contain', 'Já existe um serviço com esse nome')
    })

    it('Deve exibir erro no helper do input nome do Serviço caso ocorram erros com o nome', () => {
      cy.visit('/servico/criar-novo')
      cy.get('#service-name').type('AB')

      cy.get('#save-service-button').click()

      cy.get('#service-name-helper-text').should('contain', 'O nome deve ter no mínimo 3 caracteres')
    })

    it('Quando fechada a tela de cadastro o formulário deve ser resetado', () => {
      cy.get('#service-name').clear().type('Corte de cabelo')

      cy.get('#close-service-form-button').click()
      cy.get('#service-create-button').click()
      cy.get('#service-name').should('have.value', '')
    })

    it('Ao criar um serviço com sucesso o mesmo deve ser adicionado ao topo da lista de serviços', () => {
      Http.mockOk('GET', '/api/services', mockLoadServicesResult)
      Http.mockOk('POST', '/api/services', {
        success: true,
        error: '',
        message: 'Serviço criado com sucesso',
        data: { id: 'd9755e37-4470-416a-b5bd-b02fa73e1748', name: 'any_name', status: 'ativo' },
      }).as('createService')
      cy.visit('/servico/criar-novo')

      cy.get('#service-name').type('any_name')
      cy.get('#save-service-button').click()
      cy.wait('@createService')

      cy.get('#services-list').children().first().should('have.id', 'service-d9755e37-4470-416a-b5bd-b02fa73e1748')
    })
  })
})
