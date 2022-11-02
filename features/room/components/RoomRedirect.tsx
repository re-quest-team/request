'use client'

import { useRouter } from 'next/navigation'

export default function RoomRedirect({
  gameId,
  roomId,
}: {
  gameId: string
  roomId: string
}) {
  const router = useRouter()

  router.replace(`/studio/edit/${gameId}/${roomId}`, {
    forceOptimisticNavigation: true,
  })

  return <p>Redirecting...</p>
}
