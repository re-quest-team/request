import { RoomWithImage } from '@/features/room/types'
import prisma from '@/lib/prisma'
import { GameDeleteOneSchema } from '@/prisma/generated/schemas/deleteOneGame.schema'
import { GameUpdateOneSchema } from '@/prisma/generated/schemas/updateOneGame.schema'
import { RoomUpdateOneSchema } from '@/prisma/generated/schemas/updateOneRoom.schema'
import { APIError } from '@/types'
import { Game, Room } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Room | RoomWithImage | APIError>,
) => {
  const roomId = req.query.id as string
  const token = await getToken({ req })
  const userId = token?.sub

  if (req.method === 'GET') {
    try {
      const room = await prisma.room.findUnique({
        where: {
          id: roomId,
        },
        include: {
          image: true,
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
      // await RoomUpdateOneSchema.validate({
      //   data: req.body,
      // })

      const room = await prisma.room.update({
        where: { id: roomId },
        data: { ...req.body, updatedAt: new Date() },
      })

      res.status(200).json(room)
    } catch (e) {
      console.error(e)
      res.status(400).json({ error: e })
    }
  }

  if (req.method === 'DELETE') {
    try {
      const room = await prisma.room.delete({
        where: { id: roomId },
      })

      res.status(200).json(room)
    } catch (e) {
      console.error(e)
      res.status(400).json({ error: e })
    }
  }
}

export default handler
