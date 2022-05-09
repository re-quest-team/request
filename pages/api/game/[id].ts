import prisma from '@/lib/prisma'
import { GameUpdateOneSchema } from '@/prisma/generated/schemas/updateOneGame.schema'
import { APIError } from '@/types'
import { Game } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Game | APIError>,
) => {
  const gameId = req.query.id as string
  const token = await getToken({ req })
  const userId = token?.sub

  if (req.method === 'GET') {
    try {
      const game = await prisma.game.findUnique({
        where: {
          id: gameId,
        },
      })

      if (game?.userId !== userId) {
        return {
          redirect: {
            permanent: false,
            destination: '/',
          },
        }
      }

      if (!game) {
        res.status(404).json({ error: 'Not found' })
      } else {
        res.status(200).json(game)
      }
    } catch (e) {
      console.error(e)
      res.status(500).json({ error: e })
    }
  }

  if (req.method === 'PUT') {
    try {
      await GameUpdateOneSchema.validate({
        data: req.body,
      })

      const game = await prisma.game.update({
        where: { id: gameId },
        data: req.body,
      })

      res.status(200).json(game)
    } catch (e) {
      console.error(e)
      res.status(400).json({ error: e })
    }
  }
}

export default handler
