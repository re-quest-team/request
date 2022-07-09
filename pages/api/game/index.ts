import prisma from '@/lib/prisma'
// import { GameCreateSchema } from '@/prisma/generated/schemas/createOneGame.schema'
import { APIError } from '@/types'
import { Game } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Game | Game[] | APIError>,
) => {
  const { body } = req
  const token = await getToken({ req })
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
      // await GameCreateSchema.validate({
      //   ...body,
      //   userId,
      // })

      const game = await prisma.game.create({ data: { ...body, userId } })

      res.status(200).json(game)
    } catch (e) {
      console.error(e)
      res.status(400).json({ error: e })
    }
  }
}

export default handler
