import prisma from '@/lib/prisma'
import { APIError } from '@/types'
import { S3Image } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<S3Image | APIError>,
) => {
  const roomId = req.query.id as string
  const token = await getToken({ req })

  if (!token) return res.status(403).json({ error: 'Unauthorized' })

  const userId = token?.sub

  if (req.method === 'DELETE') {
    try {
      const image = await prisma.s3Image.delete({
        where: {
          roomId: roomId,
        },
      })

      res.status(200).json(image)
    } catch (e) {
      console.error(e)
      res.status(400).json({ error: e })
    }
  }
}

export default handler
