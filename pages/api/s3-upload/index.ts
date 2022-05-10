import { APIRoute } from 'next-s3-upload'
import prisma from '@/lib/prisma'
import { getToken } from 'next-auth/jwt'
import { ApiError } from 'next/dist/server/api-utils'

export default APIRoute.configure({
  async key(req, filename) {
    const token = await getToken({ req })
    const userId = token?.sub

    if (!userId) throw new ApiError(403, 'Unauthorized')

    const roomId: string = req.body.roomId

    const url = `images/${roomId}/${filename}`

    const image = await prisma.s3Image.create({
      data: {
        roomId,
        userId,
        url,
      },
    })

    return image.url
  },
})
