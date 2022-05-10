import AddQuestButton from '@/features/quest/components/AddQuestButton'
import { AxiosError } from 'axios'
import Image from 'next/image'
import useSWR from 'swr'
import { RoomWithImageAndQuests } from '../types'

type RoomViewProps = {
  id: string
}

const RoomView = ({ id }: RoomViewProps) => {
  const { data: room } = useSWR<RoomWithImageAndQuests, AxiosError>(
    `/api/room/${id}`,
  )

  return (
    <div className="h-screen overflow-auto">
      <div className="relative mx-auto h-full w-fit">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={process.env.NEXT_PUBLIC_S3_BASE_URL + '/' + room?.image?.url}
          className="h-full max-w-fit"
          alt="room"
        />
        {room?.quests?.map((q, i) => (
          <div
            key={i}
            className={`pointer-events-auto absolute flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-2xl border-4 bg-opacity-50 shadow backdrop-blur`}
            style={{ top: `${q.y * 100}%`, left: `${q.x * 100}%` }}
          />
        ))}
      </div>
    </div>
  )
}

export default RoomView
