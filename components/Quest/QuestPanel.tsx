import { useState } from 'react'
import { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd'
import { SelectOption } from '../Elements/Select'
import { SelectField } from '../Elements/Select/SelectField'
import FileUpload from '../FileUpload'
import Panel from '../Panel'
import QuestImagePlacer from './QuestImagePlacer'

const rooms: SelectOption[] = [
  { value: 'Eigenes Foto hochladen' },
  { value: 'Magisches Klassenzimmer' },
  { value: 'Dunkles Musem' },
  { value: 'Ohne Raum' },
]

type Props = {
  provided: DraggableProvided
  snapshot: DraggableStateSnapshot
  index: number
}

const RoomPanel = ({ provided, snapshot, index }: Props) => {
  const [room, setRoom] = useState(rooms[0])
  const [imageUrl, setImageUrl] = useState('')

  return (
    <Panel
      type="room"
      provided={provided}
      snapshot={snapshot}
      header={`Raum ${index}`}
    >
      <>
        <SelectField
          label="Thema"
          options={rooms}
          onSelect={setRoom}
        ></SelectField>
        <div className="relative my-4 w-full rounded">
          {room.value === 'Magisches Klassenzimmer' && (
            <QuestImagePlacer
              img={
                require('@/assets/rooms/abandoned-magic-classroom.jpg').default
                  .src
              }
            />
          )}
          {room.value === 'Dunkles Musem' && (
            <QuestImagePlacer
              img={require('@/assets/rooms/dark-museum.jpg').default.src}
            />
          )}
          {room.value === 'Eigenes Foto hochladen' && (
            <>
              <FileUpload onChange={url => setImageUrl(url)} />
              {imageUrl && <QuestImagePlacer img={imageUrl} />}
            </>
          )}
        </div>
      </>
    </Panel>
  )
}

export default RoomPanel
