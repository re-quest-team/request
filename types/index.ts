import { Game, Quest, Room, S3Image } from '@prisma/client'

export type APIError = {
  error: any
}

export type RequestGame = Game & {
  rooms: RequestRoom[]
}

export type RequestRoom = Room & {
  image: S3Image | null
  quests: Quest[]
}
