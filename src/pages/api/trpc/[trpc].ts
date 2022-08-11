import { z } from 'zod'

import * as trpc from '@trpc/server'
import * as trpcNext from '@trpc/server/adapters/next'

import { createTransactionSchema } from '../../../utils/validations/create-transaction-schema'

export const appRouter = trpc
  .router()
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
  .mutation('create-transaction', {
    input: createTransactionSchema,
    async resolve({ input }) {
      console.log(input)

      return input
    },
  })

export type AppRouter = typeof appRouter

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
})
