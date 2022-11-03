'use client'

import { Button } from '@/components/Elements/Button'
import GameForm from '@/features/game/components/GameForm'
import useEditGameStore from '@/stores/edit'
import {
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'
import { deleteRoom } from '../api/deleteRoom'

export default function RoomSettings({ roomId }: { roomId: string }) {
  const undo = useEditGameStore(state => state.liveblocks.room?.history.undo)
  const redo = useEditGameStore(state => state.liveblocks.room?.history.redo)
  const canUndo = useEditGameStore(
    state => state.liveblocks.room?.history.canUndo,
  )
  const canRedo = useEditGameStore(
    state => state.liveblocks.room?.history.canRedo,
  )

  return (
    <div className="flex space-x-2">
      <Button
        onClick={undo}
        className="group cursor-pointer"
        disabled={!(canUndo && canUndo())}
      >
        <ArrowUturnLeftIcon className="h-4 w-4 transition-all group-hover:scale-105" />
      </Button>
      <Button
        onClick={redo}
        className="group cursor-pointer"
        disabled={!(canRedo && canRedo())}
      >
        <ArrowUturnRightIcon className="h-4 w-4 transition-all group-hover:scale-105" />
      </Button>
      <Button size="xs" startIcon={<TrashIcon className="h-4 w-4" />}>
        Bild löschen
      </Button>
      <Button
        size="xs"
        variant="danger"
        startIcon={<TrashIcon className="h-4 w-4" />}
        onClick={() => {}}
      >
        Raum löschen
      </Button>
    </div>
  )
}
