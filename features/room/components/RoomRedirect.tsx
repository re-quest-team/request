'use client'

import { Spinner } from '@/components/Elements/Spinner'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function RoomRedirect({
  gameId,
  roomId,
}: {
  gameId: string
  roomId: string
}) {
  const router = useRouter()

  useEffect(() => {
    router.replace(`/studio/edit/${gameId}/${roomId}`)
  }, [gameId, roomId, router])

  return <Spinner />
}
