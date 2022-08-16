import { z } from 'zod'

import { Prisma } from '@prisma/client'
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
      description: z.string().nullable(),
    }),
    async resolve({ ctx, input: { page = 1, description } }) {
      const where: Prisma.TransactionWhereInput = {
        user: ctx.user?.email!,
      }

      if (description) {
        where.description = {
          contains: description,
        }
      }

      const transactions = await prismaClient.transaction.findMany({
        select: {
          id: true,
          category: true,
          createdAt: true,
          description: true,
          type: true,
          value: true,
        },
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page! - 1) * transactionsPerPage,
        take: transactionsPerPage,
      })

      const count = await prismaClient.transaction.count({
        where,
      })

      await prismaClient.$disconnect()

      return { transactions, pages: Math.ceil(count / transactionsPerPage) }
    },
  })
  .mutation('create', {
    input: createTransactionSchema,
    async resolve({ input, ctx }) {
      const transaction = await prismaClient.transaction.create({
        select: {
          id: true,
          category: true,
          createdAt: true,
          description: true,
          type: true,
          value: true,
        },
        data: {
          category: input.category,
          description: input.description,
          type: input.type,
          value: input.value,
          user: ctx.user?.email!,
        },
      })

      await prismaClient.$disconnect()

      return { transaction }
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
