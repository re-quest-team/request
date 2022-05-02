import prisma from '@/lib/prisma'
import { QuestUpdateOneSchema } from '@/prisma/generated/schemas/updateOneQuest.schema'
import { APIError } from '@/types'
import { Quest } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Quest | APIError>,
) => {
  const questId = req.query.id as string
  const token = await getToken({ req })
  const userId = token?.sub

  if (req.method === 'GET') {
    try {
      const quest = await prisma.quest.findUnique({
        where: {
          id: questId,
        },
      })

      if (quest?.userId !== userId) {
        return {
          redirect: {
            permanent: false,
            destination: '/',
          },
        }
      }

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
      await QuestUpdateOneSchema.validate({
        data: req.body,
      })

      const quest = await prisma.quest.update({
        where: { id: questId },
        data: req.body,
      })

      res.status(200).json(quest)
    } catch (e) {
      console.error(e)
      res.status(400).json({ error: e })
    }
  }
}

export default handler
