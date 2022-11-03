import prisma from '@/lib/prisma'
// import { RoomCreateSchema } from '@/prisma/generated/schemas/createOneRoom.schema'
import { APIError, RequestRoom } from '@/types'
import { Room } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<RequestRoom | APIError>,
) => {
  const { body } = req
  const token = await getToken({ req })

  if (!token) return res.status(403).json({ error: 'Unauthorized' })

  const userId = token?.sub

  if (req.method === 'POST') {
    try {
      // await RoomCreateSchema.validate(body)

      const game = await prisma.game.findFirst({
        where: {
          id: body.gameId,
        },
        include: {
          rooms: true,
        },
      })

      if (!game) throw new Error('Game not found')

      const room = await prisma.room.create({
        data: { ...body, index: game?.rooms.length },
        include: {
          image: true,
          quests: true,
        },
      })

      res.status(200).json(room)
    } catch (e) {
      console.error(e)
      res.status(400).json({ error: e })
    }
  }
}

export default handler
