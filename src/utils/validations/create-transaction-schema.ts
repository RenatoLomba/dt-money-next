import { z } from 'zod'

export { TransactionType } from '@prisma/client'

export const MIN_PRICE_VALUE = 0

export const createTransactionSchema = z.object({
  description: z.string().min(5, 'Mínimo de 5 caracteres'),
  category: z.string().min(2, 'Mínimo de 2 caracteres'),
  type: z.enum(['INPUT', 'OUTPUT']),
  value: z.number().min(0, 'Valor mínimo: 0'),
})

export type CreateTransactionInput = z.infer<typeof createTransactionSchema>
