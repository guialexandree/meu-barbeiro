import { z } from 'zod'

export const serviceUpdateValidation = z.object({
  nidame: z.string().nonempty('O id do serviço ser informado'),
  name: z.string().nonempty('O nome deve ser informado').min(3, 'O nome deve ter no mínimo 3 caracteres'),
})
