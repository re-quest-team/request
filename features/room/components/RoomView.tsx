import Modal from '@/components/Modal'
import PlayQuestButton from '@/features/quest/components/PlayQuestButton'
import quests from '@/collections'
import { IQuest } from '@/collections/types'
import { AxiosError } from 'axios'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import ScrollContainer from 'react-indiana-drag-scroll'
import useSWR from 'swr'
import { RoomWithImageAndQuests } from '../types'
import { Spinner } from '@/components/Elements/Spinner'
import { useIntl } from 'react-intl'

type RoomViewProps = {
  id: string
}

const RoomView = ({ id }: RoomViewProps) => {
  const intl = useIntl()
  const { data: room } = useSWR<RoomWithImageAndQuests, AxiosError>(
    `/api/room/${id}`,
  )

  const [solvedQuestIDs, setSolvedQuestIDs] = useState<string[]>([])
  const [currentQuest, setCurrentQuest] = useState<IQuest<any>>()

  return (
    <ScrollContainer className="h-screen overflow-auto">
      <div className="relative mx-auto h-full w-fit">
        {!room?.image?.url && <Spinner />}
        {room?.image?.url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={process.env.NEXT_PUBLIC_S3_BASE_URL + '/' + room?.image?.url}
            className="h-full max-w-fit"
            alt="room"
          />
        )}
        {room?.quests?.map((q, i) => (
          <PlayQuestButton
            solved={solvedQuestIDs.includes(q.id)}
            key={i}
            quest={q}
            onClick={() => {
              const qq = quests(intl).filter(e => e.type === q.type)[0]
              if (qq) {
                qq.onLoad(q.data as any)
                if (qq.onSolve) {
                  qq.onSolve(() => {
                    setSolvedQuestIDs([...solvedQuestIDs, q.id])
                    setCurrentQuest(undefined)
                  })
                }
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
