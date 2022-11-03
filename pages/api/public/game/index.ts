import prisma from '@/lib/prisma'
import { APIError, RequestGame } from '@/types'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<RequestGame[] | APIError>,
) => {
  if (req.method === 'GET') {
    try {
      const games = await prisma.game.findMany({
        where: {
          public: true,
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
}

export default handler
