import { Room, S3Image } from '@prisma/client'

export type RoomWithImage = Room & {
  image?: S3Image
}
