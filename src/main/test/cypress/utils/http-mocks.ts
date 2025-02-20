import { HttpStatusCode } from '../../../../data/protocols'

export const mockUnauthorizedError = (url: string, body?: any): Cypress.Chainable<null> => {
  return cy.intercept(
    {
      method: 'POST',
      url,
    },
    {
      statusCode: HttpStatusCode.unauthorized,
      body,
    },
  )
}

export const mockBadRequestError = (method: string, url: string, body?: any): Cypress.Chainable<null> => {
  return cy.intercept({ method, url }, { statusCode: HttpStatusCode.badRequest, body })
}

export const mockForbiddenError = (url: string, method: string): Cypress.Chainable<null> => {
  return cy.intercept(
    {
      method,
      url,
    },
    {
      statusCode: HttpStatusCode.forbidden,
    },
  )
}

export const mockServerError = (url: string, method: string): Cypress.Chainable<null> => {
  return cy.intercept(
    { method, url },
    {
      statusCode: HttpStatusCode.serverError,
    },
  )
}

export const mockOk = (method: string, url: string, body: any): Cypress.Chainable<null> => {
  return cy.intercept({ method, url }, { body, statusCode: HttpStatusCode.ok })
}
