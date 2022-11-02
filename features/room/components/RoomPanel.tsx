'use client'

import { SelectOption } from '@/components/Elements/Select'
import { SelectField } from '@/components/Elements/Select/SelectField'
import FileUpload from '@/components/FileUpload'
import Panel from '@/components/Panel'
import QuestImagePlacer from '@/features/quest/components/QuestImagePlacer'
import { useEffect, useRef, useState } from 'react'
import { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd'
import toast from 'react-hot-toast'
import useSWR, { mutate } from 'swr'
import { deleteRoom } from '../api/deleteRoom'
import { RoomWithImage, RoomWithImageAndQuests } from '../types'
import { useIntl } from 'react-intl'
import { deleteToast } from '@/components/Toasts'
import { Quest, Room, S3Image } from '@prisma/client'
import useEditGameStore from '@/stores/edit'
import {
  CursorArrowRaysIcon,
  CursorArrowRippleIcon,
} from '@heroicons/react/24/outline'
import RoomSettings from './RoomSettings'
import { AxiosError } from 'axios'

type Props = {
  roomId: string
}

const RoomPanel = ({ roomId }: Props) => {
  const { data: room } = useSWR<
    Room & {
      image: S3Image | null
      quests: Quest[]
    },
    AxiosError
  >(`/api/room/${roomId}`)

  const [imageUrl, setImageUrl] = useState(room?.image?.url)

  const setGameRoom = useEditGameStore(state => state.setGameRoom)

  const setCursor = useEditGameStore(state => state.setCursor)
  const others = useEditGameStore(state => state.liveblocks.others)
  const othersCursors = others
    .filter(user => user.presence.gameRoom === room?.id)
    .map(user => user.presence.cursor)

  useEffect(() => {
    if (room) setGameRoom(room.id)
  })

  useEffect(() => {
    if (room?.image?.url)
      setImageUrl(`${process.env.NEXT_PUBLIC_S3_BASE_URL}/${room?.image?.url}`)
  }, [room?.image?.url])

  const ref = useRef<HTMLDivElement>(null)

  if (!room) return <></>

  return (
    <>
      <RoomSettings
        roomId={room.id}
        onDelete={() => mutate(`/api/game/${room.gameId}`)}
      />
      {imageUrl && (
        <div
          ref={ref}
          className="relative w-full rounded"
          onPointerMove={e => {
            setCursor({
              x:
                (e.clientX - ref.current?.getBoundingClientRect().left!) /
                ref.current?.clientWidth!,
              y:
                (e.clientY - ref.current?.getBoundingClientRect().top!) /
                ref.current?.clientHeight!,
            })
          }}
        >
          {othersCursors.map((c, i) => (
            <div
              className="absolute z-20"
              key={i}
              // @ts-ignore
              style={{ top: `${c.y * 100}%`, left: `${c.x * 100}%` }}
            >
              <CursorArrowRippleIcon className="h-6 w-6 text-orange-500" />
            </div>
          ))}
          <QuestImagePlacer
            img={imageUrl}
            quests={room?.quests || []}
            roomId={room!.id}
          />
        </div>
      )}
      {!imageUrl && (
        <div className="flex h-60 items-center justify-center rounded bg-zinc-800 p-4">
          <FileUpload
            onChange={url =>
              setImageUrl(`${process.env.NEXT_PUBLIC_S3_BASE_URL}/${url}`)
            }
            roomId={room.id}
          />
        </div>
      )}
    </>
  )
}

export default RoomPanel
