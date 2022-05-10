import { SelectOption } from '@/components/Elements/Select'
import { SelectField } from '@/components/Elements/Select/SelectField'
import FileUpload from '@/components/FileUpload'
import Panel from '@/components/Panel'
import QuestImagePlacer from '@/features/quest/components/QuestImagePlacer'
import { Room } from '@prisma/client'
import { useEffect, useState } from 'react'
import { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd'
import toast from 'react-hot-toast'
import { mutate } from 'swr'
import { deleteRoom } from '../api/deleteRoom'
import { RoomWithImage } from '../types'

const roomImages: SelectOption[] = [
  { value: 'Eigenes Foto hochladen' },
  { value: 'Magisches Klassenzimmer' },
  { value: 'Dunkles Musem' },
  { value: 'Ohne Raum' },
]

type Props = {
  provided: DraggableProvided
  snapshot: DraggableStateSnapshot
  index: number
  room: RoomWithImage
}

const RoomPanel = ({ provided, snapshot, index, room }: Props) => {
  const [roomImage, setRoomImage] = useState(roomImages[0])
  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    if (room.image?.url) setImageUrl(room.image?.url)
  }, [room.image?.url])

  const onDelete = async () => {
    const deleteRoomRequest = deleteRoom(room.id)

    toast.promise(deleteRoomRequest, {
      loading: 'Löschen',
      success: 'Erfolgreich gelöscht',
      error: 'Fehler beim löschen',
    })

    await mutate(`/api/game/${room.gameId}`, (await deleteRoomRequest).data, {
      populateCache: false,
      revalidate: true,
    })
  }

  return (
    <Panel
      type="room"
      provided={provided}
      snapshot={snapshot}
      header={`Raum ${index}`}
      onDelete={onDelete}
    >
      <>
        <SelectField
          label="Thema"
          options={roomImages}
          onSelect={setRoomImage}
        ></SelectField>
        <div className="relative my-4 w-full rounded">
          {roomImage.value === 'Magisches Klassenzimmer' && (
            <QuestImagePlacer
              img={
                require('@/assets/rooms/abandoned-magic-classroom.jpg').default
                  .src
              }
            />
          )}
          {roomImage.value === 'Dunkles Musem' && (
            <QuestImagePlacer
              img={require('@/assets/rooms/dark-museum.jpg').default.src}
            />
          )}
          {roomImage.value === 'Eigenes Foto hochladen' && (
            <>
              <FileUpload onChange={url => setImageUrl(url)} roomId={room.id} />
              {imageUrl && (
                <QuestImagePlacer
                  img={`${process.env.NEXT_PUBLIC_S3_BASE_URL}/${imageUrl}`}
                />
              )}
            </>
          )}
        </div>
      </>
    </Panel>
  )
}

export default RoomPanel
