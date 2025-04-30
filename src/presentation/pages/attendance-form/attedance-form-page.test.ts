import { mockLoadServicesResult } from '../../../domain/tests/service-mocks'
import * as Http from '../../../main/test/cypress/utils'

describe('Página de Cadastro de Serviços', () => {
  beforeEach(() => {
    localStorage.clear()
    localStorage.setItem(
      'accessToken',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxYjZiZTVlZS1hNjViLTQwYmEtODBiOC1mY2I3NmIyMjZhNDUiLCJ1c2VybmFtZSI6Imd1aSIsIm5hbWUiOiJndWkiLCJpYXQiOjE3NDA5MzIxMjIsImV4cCI6MTc0MzUyNDEyMn0.MK9GnwNjt67_w6GmCRBJk1SgnD0j_wfRC99Snf7fmTs',
    )
  })

  describe('Validações de estados da página', () => {
    it('Deve iniciar a pagina com os valores corretos', () => {
      cy.visit('/servico/criar-novo')

      cy.get('#page-title').should('have.text', 'Cadastro de Serviço')
      cy.get('#page-subtitle').should(
        'have.text',
        'Crie serviços e ajuste preços para serem exibidos no app do cliente',
      )
      cy.get('#service-create-form').should('be.visible')
      cy.get('#service-name').should('have.value', '')
      cy.get('#service-description').should('have.value', '')
      cy.get('#service-price')
        .invoke('attr', 'value')
        .then((value) => {
          const numericValue = value!.replace(/\D/g, '')
          expect(numericValue).to.equal('0')
        })
      cy.get('#service-time-execution').find("input[name='timeExecution']").should('have.value', '20')
      cy.get('#service-status').find('#service-status-actived').should('have.attr', 'aria-pressed', 'true')
      cy.get('#service-status').find('#service-status-inactived').should('have.attr', 'aria-pressed', 'false')
    })
  })

  describe('Criação de novo serviço', () => {
    it('Deve ser obrigatório selecionar um status para o serviço', () => {
      cy.get('#service-status-actived')
        .invoke('attr', 'aria-pressed')
        .then((actived) => {
          cy.get('#service-status-actived').click()
          cy.get('#service-status-actived').should('have.attr', 'aria-pressed', actived)
        })
    })

    it('Deve preencher o nome do serviço corretamente', () => {
      cy.get('#service-name').type('any_service')
      cy.get('#service-name').should('have.value', 'ANY_SERVICE')
    })

    it('Deve preencher a descrição do serviço corretamente', () => {
      cy.get('#service-description').type('any_service_description')
      cy.get('#service-description').should('have.value', 'ANY_SERVICE_DESCRIPTION')
    })

    it('O nome do serviço não deve conter menos de 3 caracteres', () => {
      cy.get('#service-name').clear().type('AB')

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

    it('Ao criar um serviço com sucesso o mesmo deve ser adicionado na lista de serviços', () => {
      const mockResult = mockLoadServicesResult
      const newService = {
        id: 'd9755e37-4470-416a-b5bd-b02fa73e1748',
        name: 'ANY_NAME',
        description: 'CORTE ATUALIZADO',
        status: 'ativo',
        price: 20,
        timeExecution: 20,
      } as any

      mockResult.data = [
        ...mockLoadServicesResult.data,
        newService
      ]
      Http.mockOk('GET', '/api/services', mockLoadServicesResult)
      Http.mockOk('POST', '/api/services', {
        success: true,
        error: '',
        message: 'Serviço criado com sucesso',
        data: newService,
      }).as('createService')
      cy.visit('/servico/criar-novo')

      cy.get('#service-name').type(newService.name)
      cy.get('#service-description').type(newService.description)
      cy.get('#save-service-button').click()
      cy.wait('@createService')

      cy.get(`#service-${newService.id}`).should('exist')
      cy.get(`#service-${newService.id} #service-name`).should('have.text', 'ANY_NAME')
      cy.get(`#service-${newService.id} #service-description`).should('have.text', 'CORTE ATUALIZADO')
    })

    it.skip('Deve exibir o loading enquanto grava o serviço', () => {})

  })

  describe('Edição de novo serviço', () => {
    it('Deve ser obrigatório selecionar um status para o serviço', () => {
      cy.get('#service-status-actived')
        .invoke('attr', 'aria-pressed')
        .then((actived) => {
          cy.get('#service-status-actived').click()
          cy.get('#service-status-actived').should('have.attr', 'aria-pressed', actived)
        })
    })
  })
})
