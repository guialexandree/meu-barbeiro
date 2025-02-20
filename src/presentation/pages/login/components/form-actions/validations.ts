import { z } from 'zod'

export const authenticationValidation = z.object({
  username: z.string().nonempty('O nome de usuário deve ser informado'),
  password: z.string().nonempty('A senha deve ser informada').min(6, 'A senha deve ter no mínimo 6 caracteres'),
})
