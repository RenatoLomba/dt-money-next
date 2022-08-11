import { z } from 'zod'

import { TRPCError } from '@trpc/server'
import * as trpcNext from '@trpc/server/adapters/next'

import { createContext, createRouter } from '../../../server/context'
import { createTransactionSchema } from '../../../utils/validations/create-transaction-schema'

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
  .merge(
    'auth.',
    createRouter()
      .middleware(async ({ ctx, next }) => {
        if (!ctx.user) {
          throw new TRPCError({ code: 'UNAUTHORIZED' })
        }

        return next()
      })
      .mutation('create-transaction', {
        input: createTransactionSchema,
        async resolve({ input }) {
          console.log(input)

          return input
        },
      }),
  )

export type AppRouter = typeof appRouter

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
})
