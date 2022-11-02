import { Button } from '@/components/Elements/Button'
import { TrashIcon } from '@heroicons/react/24/outline'
import { deleteRoom } from '../api/deleteRoom'

export default function RoomSettings({ roomId }: { roomId: string }) {
  return (
    <div className="mb-4 flex w-full justify-end space-x-4">
      <Button size="xs" startIcon={<TrashIcon className="h-4 w-4" />}>
        Bild löschen
      </Button>
      <Button
        size="xs"
        variant="danger"
        startIcon={<TrashIcon className="h-4 w-4" />}
        onClick={() => deleteRoom(roomId)}
      >
        Raum löschen
      </Button>
    </div>
  )
}
