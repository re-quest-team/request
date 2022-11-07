'use client'

import FileUpload from '@/components/FileUpload'
import QuestImagePlacer from '@/features/quest/components/QuestImagePlacer'
import { useEffect, useRef, useState } from 'react'
import useEditGameStore from '@/stores/edit'
import { CursorArrowRippleIcon } from '@heroicons/react/24/outline'
import useRoom from '../api/useRoom'
import useGame from '@/features/game/api/useGame'
import { useRouter } from 'next/navigation'

type Props = {
  gameId: string
  roomId: string
}

const RoomPanel = ({ gameId, roomId }: Props) => {
  const { room, deleteRoom } = useRoom(roomId)
  const { game, mutate } = useGame(gameId)
  const router = useRouter()

  const [imageUrl, setImageUrl] = useState(room?.image?.url)

  const setCursor = useEditGameStore(state => state.setCursor)
  const others = useEditGameStore(state => state.liveblocks.others)
  const othersCursors = others
    .filter(user => user.presence.gameRoom === room?.id)
    .map(user => user.presence.cursor)

  useEffect(() => {
    if (room?.image?.url)
      setImageUrl(`${process.env.NEXT_PUBLIC_S3_BASE_URL}/${room?.image?.url}`)
  }, [room?.image?.url])

  const ref = useRef<HTMLDivElement>(null)

  const _onDelete = async () => {
    // get current position of room in game
    const roomIndex = game?.rooms.findIndex(r => r.id === roomId)
    await deleteRoom(roomId)

    if (roomIndex && roomIndex > 0) {
      // select the prev room
      router.replace(`/studio/edit/${gameId}/${game?.rooms[roomIndex - 1].id}`)
    } else {
      // if first one is deleted, select the new first one
      router.replace(`/studio/edit/${gameId}/${game?.rooms[1].id}`)
    }
    mutate()
  }

  if (!room) return <></>

  return (
    <>
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
          <QuestImagePlacer img={imageUrl} roomId={room!.id} />
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
