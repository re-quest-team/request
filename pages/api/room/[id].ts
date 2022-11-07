import prisma from '@/lib/prisma'
// import { GameDeleteOneSchema } from '@/prisma/generated/schemas/deleteOneGame.schema'
// import { GameUpdateOneSchema } from '@/prisma/generated/schemas/updateOneGame.schema'
// import { RoomUpdateOneSchema } from '@/prisma/generated/schemas/updateOneRoom.schema'
import { APIError, RequestRoom } from '@/types'
import { Room } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<RequestRoom | APIError>,
) => {
  const roomId = req.query.id as string
  const token = await getToken({ req })

  if (!token) return res.status(403).json({ error: 'Unauthorized' })

  const userId = token?.sub

  if (req.method === 'GET') {
    try {
      const room = await prisma.room.findUnique({
        where: {
          id: roomId,
        },
        include: {
          image: true,
          quests: true,
        },
      })

      if (!room) {
        res.status(404).json({ error: 'Not found' })
      }

      res.status(200).json(room!)
    } catch (e) {
      console.error(e)
      res.status(500).json({ error: e })
    }
  }

  if (req.method === 'PUT') {
    try {
      const room = await prisma.room.update({
        where: { id: roomId },
        data: { ...req.body, updatedAt: new Date() },
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

  if (req.method === 'DELETE') {
    try {
      const game = await prisma.game.findFirst({
        where: {
          rooms: {
            some: {
              id: roomId,
            },
          },
        },
        include: {
          rooms: true,
        },
      })

      if (!game) throw new Error('Game not found')

      if (game?.rooms.length === 1) {
        return res
          .status(403)
          .json({ error: 'Game must have at least one room' })
      }

      const room = await prisma.room.delete({
        where: { id: roomId },
        include: {
          image: true,
          quests: true,
        },
      })

      // update index for remaining rooms
      const newRooms: Room[] = game?.rooms
        .filter(r => r.id !== roomId)
        .sort((a, b) => a.index - b.index)
        .map((r, i) => ({ ...r, index: i }))
      await prisma.$transaction(
        newRooms.map(r =>
          prisma.room.update({
            where: {
              id: r.id,
            },
            data: r,
          }),
        ),
      )

      res.status(200).json(room)
    } catch (e) {
      console.error(e)
      res.status(400).json({ error: e })
    }
  }
}

export default handler
