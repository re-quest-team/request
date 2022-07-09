import prisma from '@/lib/prisma'
// import { RoomCreateSchema } from '@/prisma/generated/schemas/createOneRoom.schema'
import { APIError } from '@/types'
import { Room } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Room | Room[] | APIError>,
) => {
  const { body } = req
  const token = await getToken({ req })
  const userId = token?.sub

  if (req.method === 'POST') {
    try {
      // await RoomCreateSchema.validate(body)

      const room = await prisma.room.create({ data: body })

      res.status(200).json(room)
    } catch (e) {
      console.error(e)
      res.status(400).json({ error: e })
    }
  }
}

export default handler
