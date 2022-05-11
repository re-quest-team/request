import { Quest, Room, S3Image } from '@prisma/client'

export type RoomWithImage = Room & {
  image?: S3Image
}

export type RoomWithImageAndQuests = Room & {
  image?: S3Image
  quests?: Quest[]
}
