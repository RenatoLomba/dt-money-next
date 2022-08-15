import { z } from 'zod'

import { TRPCError } from '@trpc/server'

import { createTransactionSchema } from '../../utils/validations/create-transaction-schema'
import { createRouter } from '../context'
import { prismaClient } from '../prisma'

export const transactionsRouter = createRouter()
  .middleware(async ({ ctx, next }) => {
    if (!ctx.user) {
      throw new TRPCError({ code: 'UNAUTHORIZED' })
    }

    return next()
  })
  .query('get-by-user', {
    async resolve({ ctx }) {
      const transactions = await prismaClient.transaction.findMany({
        select: {
          id: true,
          category: true,
          createdAt: true,
          description: true,
          type: true,
          value: true,
        },
        where: {
          user: ctx.user?.email!,
        },
        orderBy: { createdAt: 'desc' },
      })

      await prismaClient.$disconnect()

      return { transactions }
    },
  })
  .mutation('create', {
    input: createTransactionSchema,
    async resolve({ input, ctx }) {
      await prismaClient.transaction.create({
        data: {
          category: input.category,
          description: input.description,
          type: input.type,
          value: input.value,
          user: ctx.user?.email!,
        },
      })

      await prismaClient.$disconnect()
    },
  })
  .mutation('delete', {
    input: z.object({
      transactionId: z.string().uuid(),
    }),
    async resolve({ input }) {
      await prismaClient.transaction.delete({
        where: {
          id: input.transactionId,
        },
      })

      await prismaClient.$disconnect()
    },
  })
