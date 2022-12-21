'use client'

import FileUpload from '@/components/FileUpload'
import QuestImagePlacer from '@/features/quest/components/QuestImagePlacer'
import { useEffect, useRef, useState } from 'react'
import useEditGameStore from '@/stores/edit'
import useRoom from '../api/useRoom'
import useGame from '@/features/game/api/useGame'
import { useRouter } from 'next/navigation'
import Cursor from '@/components/Cursor'

type Props = {
  gameId: string
  roomId: string
}

const RoomPanel = ({ gameId, roomId }: Props) => {
  const { room, deleteRoom } = useRoom(roomId)
  const { game, mutate } = useGame(gameId)
  const router = useRouter()

  const [imageUrl, setImageUrl] = useState(room?.image?.url)

  const setGameRoom = useEditGameStore(store => store.setGameRoom)

  useEffect(() => {
    setGameRoom(roomId)
  }, [roomId])

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
          {othersCursors.map((c: any, i) => (
            <Cursor key={i} color={'orange'} x={c.x} y={c.y} />
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
