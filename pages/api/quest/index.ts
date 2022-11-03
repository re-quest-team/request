import prisma from '@/lib/prisma'
// import { QuestCreateSchema } from '@/prisma/generated/schemas/createOneQuest.schema'
import { APIError } from '@/types'
import { Quest } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Quest | APIError>,
) => {
  const { body } = req
  const token = await getToken({ req })

  if (!token) return res.status(403).json({ error: 'Unauthorized' })

  if (req.method === 'POST') {
    try {
      const quest = await prisma.quest.create({ data: body })

      res.status(200).json(quest)
    } catch (e) {
      console.error(e)
      res.status(400).json({ error: e })
    }
  }
}

export default handler
