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

type Props = {
  room: Room & {
    image: S3Image | null
    quests: Quest[]
  }
}

const RoomPanel = ({ room }: Props) => {
  const intl = useIntl()

  const [imageUrl, setImageUrl] = useState('')

  const setGameRoom = useEditGameStore(state => state.setGameRoom)

  const setCursor = useEditGameStore(state => state.setCursor)
  const others = useEditGameStore(state => state.liveblocks.others)
  const othersCursors = others
    .filter(user => user.presence.gameRoom === room.id)
    .map(user => user.presence.cursor)

  useEffect(() => {
    setGameRoom(room.id)
  })

  useEffect(() => {
    if (room?.image?.url)
      setImageUrl(`${process.env.NEXT_PUBLIC_S3_BASE_URL}/${room?.image?.url}`)
  }, [room?.image?.url])

  const ref = useRef<HTMLDivElement>(null)

  return (
    <>
      <div className="relative my-4 w-full rounded">
        <FileUpload
          onChange={url =>
            setImageUrl(`${process.env.NEXT_PUBLIC_S3_BASE_URL}/${url}`)
          }
          roomId={room.id}
        />

        {imageUrl && (
          <div
            ref={ref}
            className="relative"
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
      </div>
    </>
  )
}

export default RoomPanel
