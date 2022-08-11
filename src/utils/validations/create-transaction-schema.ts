import { z } from 'zod'

export const MIN_PRICE_VALUE = 0

export const createTransactionSchema = z.object({
  description: z.string().min(5, 'Mínimo de 5 caracteres'),
  category: z.string().min(5, 'Mínimo de 5 caracteres'),
  type: z.enum(['input', 'output']),
  value: z.number().min(0, 'Valor mínimo: 0'),
})

export type CreateTransactionInput = z.infer<typeof createTransactionSchema>
