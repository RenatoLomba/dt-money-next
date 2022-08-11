import { z } from 'zod'

export const createTransactionSchema = z.object({
  description: z.string(),
  category: z.string(),
  type: z.enum(['input', 'output']),
  value: z.number().min(0),
})

export type CreateTransactionInput = z.infer<typeof createTransactionSchema>
