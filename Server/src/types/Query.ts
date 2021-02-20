import { intArg, nullable, queryType, stringArg } from 'nexus'
import { getUserId } from '../utils'

export const Query = queryType({
  definition(t) {
    t.nullable.field('me', {
      type: 'User',
      resolve: (parent, args, ctx) => {
        const userId = getUserId(ctx)
        return ctx.prisma.user.findUnique({
          where: {
            id: Number(userId),
          },
        })
      },
    })

    t.list.field('users', {
      type: 'User',
      resolve: (parent, args, ctx) => {
        return ctx.prisma.user.findMany({
        })
      },
    })

    t.list.field("tweets", {
			type: "Tweet",
			resolve: (parent, args, ctx) => {
				return ctx.prisma.tweet.findMany()
			}
		})

    t.field("tweet", {
			type: "Tweet",
			nullable: true,
			args: { id: intArg() },
			resolve: (parent, { id }, ctx) => {
				return ctx.prisma.tweet.findOne({
					where: {
						id: Number(id)
					}
				})
			}
		})

    t.field("user", {
			type: "User",
			nullable: true,
			args: { id: intArg() },
			resolve: (parent, { id }, ctx) => {
				return ctx.prisma.user.findOne({
					where: {
						id: Number(id)
					}
				})
			}
		})
   
   },
})
