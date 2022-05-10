import { APIRoute } from 'next-s3-upload'
import prisma from '@/lib/prisma'
import { getToken } from 'next-auth/jwt'

export default APIRoute.configure({
  async key(req, filename) {
    const token = await getToken({ req })
    const userId = token?.sub

    const roomId: string = req.body.roomId

    const url = `images/${roomId}/${filename}`

    const image = await prisma.s3Image.create({
      data: {
        room: roomId,
        userId: userId!,
        url,
      },
    })

    return image.url
  },
})
