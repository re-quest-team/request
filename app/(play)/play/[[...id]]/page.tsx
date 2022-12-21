import React from 'react'
import RoomView from '@/features/room/components/RoomView'

export default async function Page({ params }: { params: { id: string[] } }) {
  const [_gameId, roomId] = params.id

  return <RoomView id={roomId} />
}
