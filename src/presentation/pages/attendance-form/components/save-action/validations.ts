import { z } from 'zod'

export const serviceCreateValidation = z.object({
  services: z.array(z.string()).nonempty('Deve ser informado ao menos um serviço para atendimento'),
})
