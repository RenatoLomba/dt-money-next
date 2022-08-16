import { z } from 'zod'

import { TRPCError } from '@trpc/server'

import { createTransactionSchema } from '../../utils/validations/create-transaction-schema'
import { createRouter } from '../context'
import { prismaClient } from '../prisma'

const transactionsPerPage = 5

export const transactionsRouter = createRouter()
  .middleware(async ({ ctx, next }) => {
    if (!ctx.user) {
      throw new TRPCError({ code: 'UNAUTHORIZED' })
    }

    return next()
  })
  .query('get-summary-data', {
    async resolve({ ctx }) {
      const summary = await prismaClient.transaction.groupBy({
        by: ['type'],
        _sum: {
          value: true,
        },
        where: {
          user: ctx.user?.email!,
        },
      })

      await prismaClient.$disconnect()

      return {
        outputs: summary[0]._sum.value ?? 0,
        inputs: summary[1]._sum.value ?? 0,
      }
    },
  })
  .query('get-by-user', {
    input: z.object({
      page: z.number().nullable().default(1),
    }),
    async resolve({ ctx, input: { page = 1 } }) {
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
        skip: (page! - 1) * transactionsPerPage,
        take: transactionsPerPage,
      })

      const count = await prismaClient.transaction.count({
        where: {
          user: ctx.user?.email!,
        },
      })

      await prismaClient.$disconnect()

      return { transactions, pages: Math.ceil(count / transactionsPerPage) }
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
