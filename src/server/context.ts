import { getSession } from 'next-auth/react'
import superjson from 'superjson'

import * as trpc from '@trpc/server'
import { inferAsyncReturnType } from '@trpc/server'
import * as trpcNext from '@trpc/server/adapters/next'

export async function createContext({
  req,
}: trpcNext.CreateNextContextOptions) {
  const session = await getSession({
    req,
  })

  const user = session?.user

  return {
    user,
  }
}

export type Context = inferAsyncReturnType<typeof createContext>

export function createRouter() {
  return trpc.router<Context>().transformer(superjson)
}
