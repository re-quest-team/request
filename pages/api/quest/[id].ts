import { RoomWithImage } from '@/features/room/types'
import prisma from '@/lib/prisma'
import { APIError } from '@/types'
import { Game, Quest, Room } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Quest | APIError>,
) => {
  const questId = req.query.id as string
  const token = await getToken({ req })

  if (!token) return res.status(403).json({ error: 'Unauthorized' })

  if (req.method === 'GET') {
    try {
      const quest = await prisma.quest.findUnique({
        where: {
          id: questId,
        },
      })

      if (!quest) {
        res.status(404).json({ error: 'Not found' })
      }

      res.status(200).json(quest!)
    } catch (e) {
      console.error(e)
      res.status(500).json({ error: e })
    }
  }

  if (req.method === 'PUT') {
    try {
      const quest = await prisma.quest.update({
        where: { id: questId },
        data: { ...req.body, updatedAt: new Date() },
      })

      res.status(200).json(quest)
    } catch (e) {
      console.error(e)
      res.status(400).json({ error: e })
    }
  }

  if (req.method === 'DELETE') {
    try {
      const quest = await prisma.quest.delete({
        where: { id: questId },
      })

      res.status(200).json(quest)
    } catch (e) {
      console.error(e)
      res.status(400).json({ error: e })
    }
  }
}

export default handler
