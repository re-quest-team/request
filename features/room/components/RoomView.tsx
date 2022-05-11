import AddQuestButton from '@/features/quest/components/AddQuestButton'
import PlayQuestButton from '@/features/quest/components/PlayQuestButton'
import { AxiosError } from 'axios'
import Image from 'next/image'
import ScrollContainer from 'react-indiana-drag-scroll'
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
    <ScrollContainer className="h-screen overflow-auto">
      <div className="relative mx-auto h-full w-fit">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={process.env.NEXT_PUBLIC_S3_BASE_URL + '/' + room?.image?.url}
          className="h-full max-w-fit"
          alt="room"
        />
        {room?.quests?.map((q, i) => (
          <PlayQuestButton key={i} quest={q} onClick={() => {}} />
        ))}
      </div>
    </ScrollContainer>
  )
}

export default RoomView
