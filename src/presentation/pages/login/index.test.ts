import * as Http from '../../../main/test/cypress/utils'

describe('Página de Login', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe('Validações de estados da página', () => {
    it('Deve iniciar a página com os valores corretos', () => {
      cy.visit('/')
      cy.get('img#logo').should('be.visible')
      cy.get('#title-page').should('be.visible')
      cy.get('#login-user').should('have.value', '')
      cy.get('#login-password').should('have.value', '')
      cy.get('#recovery-password-button').should('be.visible')
    })
  })

  describe('Validações do formulário', () => {
    it('Deve exibir mensagem de erro ao tentar logar com username vazio', () => {
      cy.get('#login-button').click()

      cy.get('#login-user-helper-text').should('contain', 'O nome de usuário deve ser informado')
    })

    it('Deve limpar a mensagem de erro ao alterar o valor do input', () => {
      cy.get('#login-user-helper-text').should('contain', 'O nome de usuário deve ser informado')

      cy.get('#login-user').type('ADMINISTRATOR')

      cy.get('#login-user-helper-text').should('not.exist')
    })

    it('Deve exibir mensagem de erro ao tentar logar com password vazio', () => {
      cy.get('#login-button').click()
      cy.get('#login-password-helper-text').should('contain', 'A senha deve ser informada')
    })

    it('Deve exibir mensagem de erro ao tentar logar com password com menos de 6 caracteres', () => {
      cy.get('#login-password').type('12345')
      cy.get('#login-button').click()
      cy.get('#login-password-helper-text').should('contain', 'A senha deve ter no mínimo 6 caracteres')
    })

    it('Deve exibir mensagem de erro ao tentar logar com credenciais inválidas', () => {
      Http.mockUnauthorizedError('/api/auth', {
        success: false,
        data: [],
        message: '',
        error: 'As credenciais fornecidas estão incorretas',
      })

      cy.get('#login-password').type('6')
      cy.get('#login-button').click()

      cy.get('#login-password-helper-text').should('contain', 'As credenciais fornecidas estão incorretas')
    })

    it('Deve ser possível alterar a visualização da senha', () => {
      cy.visit('/')

      cy.get('#login-password').type('123456')
      cy.get('#toggle-password-visibility').click()
      cy.get('#login-password').should('have.attr', 'type', 'text')

      cy.get('#toggle-password-visibility').click()
      cy.get('#login-password').should('have.attr', 'type', 'password')
    })

    it('Deve inativar o botão de login quando existir erro no formulário', () => {
      cy.visit('/')

      cy.get('#login-user').type('ADMINISTRATOR')
      cy.get('#login-password').type('12345')
      cy.get('#login-button').click()

      cy.get('#login-button').should('be.disabled')
      cy.get('#login-password-helper-text').should('contain', 'A senha deve ter no mínimo 6 caracteres')
    })

    it('Deve inativar o botão de login quando estiver realizando o login', () => {
      Http.mockOk('POST', '/api/auth', { success: true, data: { accessToken: 'fakeAccessToken123' } }).as(
        'loginRequest',
      )
      cy.visit('/')

      cy.get('#login-user').type('ADMINISTRATOR')
      cy.get('#login-password').type('123456')
      cy.get('#login-button').click()
      cy.get('#login-button').should('be.disabled')
      cy.get('#recovery-password-button').should('be.disabled')

      cy.wait('@loginRequest').then(() => {
        cy.get('#login-button').should('not.be.disabled')
        cy.get('#recovery-password-button').should('not.be.disabled')
      })
    })

    it('Deve bloquear campos e exibir loading enquanto realizada o login', () => {
      Http.mockOk('POST', '/api/auth', { success: true, data: { accessToken: 'fakeAccessToken123' } }).as(
        'loginRequest',
      )
      cy.visit('/')

      cy.get('#login-user').type('ADMINISTRATOR')
      cy.get('#login-password').type('123456')
      cy.get('#login-button').click()

      cy.get('#login-user').should('be.disabled')
      cy.get('#login-password').should('be.disabled')
      cy.get('#login-button').should('be.disabled')
      cy.get('#recovery-password-button').should('be.disabled')

      cy.wait('@loginRequest').then(() => {
        cy.get('.MuiButton-loading').should('not.exist')
      })
    })

    it('Deve gravar o accessToken em localStorage quando login realizado com sucesso', () => {
      const accessToken = 'fakeAccessToken123'
      Http.mockOk('POST', '/api/auth', { success: true, data: { accessToken } }).as('loginRequest')
      cy.visit('/')

      cy.get('#login-user').type('ADMINISTRATOR')
      cy.get('#login-password').type('123456')
      cy.get('#login-button').click()

      cy.wait('@loginRequest').then(() => {
        cy.window().then((windows) => {
          const parsedToken = JSON.parse(windows.localStorage.accessToken)
          expect(parsedToken.accessToken).to.eq(accessToken)
          cy.url().should('include', '/')
        })
      })
    })
  })
})
