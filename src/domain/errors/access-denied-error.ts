export class AccessDeniedError extends Error {
  constructor() {
    super('As credenciais fornecidas estão incorretas')
    this.name = 'AccessDeniedError'
  }
}
