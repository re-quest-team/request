import prisma from '@/lib/prisma'
import { APIError, RequestGame } from '@/types'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<RequestGame | RequestGame[] | APIError>,
) => {
  const { body } = req
  const token = await getToken({ req })

  if (!token) return res.status(403).json({ error: 'Unauthorized' })

  const userId = token?.sub

  if (req.method === 'GET') {
    try {
      const games = await prisma.game.findMany({
        where: {
          userId,
        },
        include: {
          rooms: {
            include: {
              image: true,
              quests: true,
            },
          },
        },
      })

      res.status(200).json(games)
    } catch (e) {
      console.error(e)
      res.status(400).json({ error: e })
    }
  }

  if (req.method === 'POST') {
    try {
      const game = await prisma.game.create({
        data: { ...body, userId },
        include: {
          rooms: {
            include: {
              image: true,
              quests: true,
            },
          },
        },
      })

      // create empty room
      await prisma.room.create({
        data: {
          gameId: game.id,
        },
      })

      res.status(200).json(game)
    } catch (e) {
      console.error(e)
      res.status(400).json({ error: e })
    }
  }
}

export default handler
