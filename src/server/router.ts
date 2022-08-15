import { z } from 'zod'

import { createRouter } from './context'
import { transactionsRouter } from './routers/transactions'

export const appRouter = createRouter()
  .query('hello', {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    resolve({ input }) {
      return {
        greeting: `hello ${input?.text ?? 'world'}`,
      }
    },
  })
  .merge('transactions.', transactionsRouter)

export type AppRouter = typeof appRouter
