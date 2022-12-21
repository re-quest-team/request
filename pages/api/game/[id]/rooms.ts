import prisma from '@/lib/prisma'
import { APIError, RequestRoom } from '@/types'
import { Game } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Game | APIError>,
) => {
  const gameId = req.query.id as string
  const token = await getToken({ req })

  if (!token) return res.status(403).json({ error: 'Unauthorized' })

  const userId = token?.sub

  if (req.method === 'PUT') {
    try {
      const game = await prisma.game.findFirst({
        where: { id: gameId },
        select: {
          rooms: true,
        },
      })

      // room ids from the request
      const roomIds = (req.body as RequestRoom[]).map(r => r.id)

      const newRoomOrder = roomIds.map((r, i) => ({
        ...game?.rooms.find(room => room.id === r),
        index: i,
      }))

      await prisma.$transaction(
        newRoomOrder.map(r =>
          prisma.room.update({
            where: {
              id: r.id,
            },
            data: r,
          }),
        ),
      )

      const gameReturn = await prisma.game.findFirst({
        where: {
          id: gameId,
        },
      })

      res.status(200).json(gameReturn!)
    } catch (e) {
      console.error(e)
      res.status(400).json({ error: e })
    }
  }
}

export default handler
