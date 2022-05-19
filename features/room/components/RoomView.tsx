import Modal from '@/components/Modal'
import PlayQuestButton from '@/features/quest/components/PlayQuestButton'
import quests from '@/collections'
import { IQuest } from '@/collections/types'
import { AxiosError } from 'axios'
import Image from 'next/image'
import { useState } from 'react'
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

  const [currentQuest, setCurrentQuest] = useState<IQuest<any>>()

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
          <PlayQuestButton
            key={i}
            quest={q}
            onClick={() => {
              const qq = quests.filter(e => e.type === q.type)[0]
              if (qq) {
                qq.onLoad(q.data as any)
                setCurrentQuest(qq)
              }
            }}
          />
        ))}
      </div>

      <Modal
        open={currentQuest !== undefined}
        onClose={() => setCurrentQuest(undefined)}
        title={''}
      >
        <>{currentQuest && <currentQuest.PlayView />}</>
      </Modal>
    </ScrollContainer>
  )
}

export default RoomView
