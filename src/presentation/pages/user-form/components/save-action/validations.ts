import { z } from 'zod'

export const clientCreateValidation = z.object({
  contactNumber: z
    .string()
    .nonempty('O número de contato deve ser informado')
    .min(9, 'O número deve ter no mínimo 8 digítos'),
  name: z.string().nonempty('O nome deve ser informado').min(3, 'O nome deve ter no mínimo 3 caracteres'),
})
