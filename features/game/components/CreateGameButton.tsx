'use client'

import { Button } from '@/components/Elements/Button'
import { useRouter } from 'next/navigation'
import { createGame } from '../api/createGame'

export default function CreateGameButton() {
  const router = useRouter()
  return (
    <Button
      onClick={async () => {
        const newGame = await createGame()
        router.push(`/studio/edit/${newGame.data.id}`)
      }}
    >
      New Quest
    </Button>
  )
}
