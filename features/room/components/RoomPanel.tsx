import { SelectOption } from '@/components/Elements/Select'
import { SelectField } from '@/components/Elements/Select/SelectField'
import FileUpload from '@/components/FileUpload'
import Panel from '@/components/Panel'
import QuestImagePlacer from '@/features/quest/components/QuestImagePlacer'
import { useEffect, useState } from 'react'
import { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd'
import toast from 'react-hot-toast'
import useSWR, { mutate } from 'swr'
import { deleteRoom } from '../api/deleteRoom'
import { RoomWithImage, RoomWithImageAndQuests } from '../types'
import { useIntl } from 'react-intl'
import { deleteToast } from '@/components/Toasts'

type Props = {
  provided: DraggableProvided
  snapshot: DraggableStateSnapshot
  index: number
  roomId: string
}

const RoomPanel = ({ provided, snapshot, index, roomId }: Props) => {
  const intl = useIntl()
  const roomImages: SelectOption[] = [
    {
      value: intl.formatMessage({
        id: 'features.room.roomPanel.uploadOwnImage',
      }),
    },
    {
      value: intl.formatMessage({
        id: 'features.room.roomPanel.magicalClassroom',
      }),
    },
    { value: intl.formatMessage({ id: 'features.room.roomPanel.darkMuseum' }) },
    { value: intl.formatMessage({ id: 'features.room.roomPanel.noRom' }) },
  ]
  const [roomImage, setRoomImage] = useState(roomImages[0])
  const [imageUrl, setImageUrl] = useState('')
  const { data: room } = useSWR<RoomWithImageAndQuests>(`/api/room/${roomId}`)

  if (roomImages.map(option => option.value).indexOf(roomImage.value) < 0) {
    setRoomImage(roomImages[0])
  }

  useEffect(() => {
    if (room?.image?.url)
      setImageUrl(`${process.env.NEXT_PUBLIC_S3_BASE_URL}/${room?.image?.url}`)
  }, [room?.image?.url])

  useEffect(() => {
    if (
      roomImage.value ===
      intl.formatMessage({ id: 'features.room.roomPanel.magicalClassroom' })
    ) {
      setImageUrl(
        require('@/assets/rooms/abandoned-magic-classroom.jpg').default.src,
      )
    } else if (
      roomImage.value ===
      intl.formatMessage({ id: 'features.room.roomPanel.darkMuseum' })
    ) {
      setImageUrl(require('@/assets/rooms/dark-museum.jpg').default.src)
    }
  }, [roomImage.value, intl])

  const onDelete = async () => {
    const deleteRoomRequest = deleteRoom(room!.id)

    deleteToast(deleteRoomRequest, intl)

    await mutate(`/api/game/${room!.gameId}`, (await deleteRoomRequest).data, {
      populateCache: false,
      revalidate: true,
    })
  }

  return (
    <Panel
      type="room"
      provided={provided}
      snapshot={snapshot}
      header={
        intl.formatMessage({ id: 'features.room.roomPanel.headerRoom' }) +
        ' ' +
        index
      }
      onDelete={onDelete}
    >
      <>
        <SelectField
          label={intl.formatMessage({
            id: 'features.room.roomPanel.labelTheme',
          })}
          options={roomImages}
          onSelect={setRoomImage}
        ></SelectField>
        <div className="relative my-4 w-full rounded">
          {roomImage.value ===
            intl.formatMessage({
              id: 'features.room.roomPanel.uploadOwnImage',
            }) && (
            <FileUpload
              onChange={url =>
                setImageUrl(`${process.env.NEXT_PUBLIC_S3_BASE_URL}/${url}`)
              }
              roomId={roomId}
            />
          )}
          {imageUrl && (
            <QuestImagePlacer
              img={imageUrl}
              quests={room?.quests || []}
              roomId={room!.id}
            />
          )}
        </div>
      </>
    </Panel>
  )
}

export default RoomPanel
