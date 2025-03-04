import { z } from 'zod'

export const serviceCreateValidation = z.object({
  name: z.string().nonempty('O nome deve ser informado').min(3, 'O nome deve ter no mínimo 3 caracteres'),
})
