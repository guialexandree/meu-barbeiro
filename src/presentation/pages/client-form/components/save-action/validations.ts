import { z } from 'zod'

export const clientCreateValidation = z.object({
  contactNumber: z
    .string()
    .nonempty('O número de contato deve ser informado')
    .min(9, 'O número deve ter no mínimo 8 digítos'),
  name: z.string().nonempty('O nome deve ser informado').min(3, 'O nome deve ter no mínimo 3 caracteres'),
  password: z.string().nonempty('A senha deve ser informada').min(6, 'A senha deve ter no mínimo 6 caracteres'),
})
