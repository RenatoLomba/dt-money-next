import { z } from 'zod'

import { TRPCError } from '@trpc/server'
import * as trpcNext from '@trpc/server/adapters/next'

import { createContext, createRouter } from '../../../server/context'
import { prismaClient } from '../../../server/prisma'
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
      .query('get-user-transactions', {
        async resolve({ ctx }) {
          const transactions = await prismaClient.transaction.findMany({
            where: {
              user: ctx.user?.email!,
            },
          })

          return { transactions }
        },
      })
      .mutation('create-transaction', {
        input: createTransactionSchema,
        async resolve({ input, ctx }) {
          const transaction = await prismaClient.transaction.create({
            data: {
              category: input.category,
              description: input.description,
              type: input.type,
              value: input.value,
              user: ctx.user?.email!,
            },
          })

          return { transaction }
        },
      }),
  )

export type AppRouter = typeof appRouter

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
})
