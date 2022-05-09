import { Spinner } from '@/components/Elements/Spinner'
import { Game } from '@prisma/client'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const NewQuest = () => {
  const router = useRouter()

  useEffect(() => {
    const redirect = async () => {
      const getIdRequest = await axios.post<Game>('/api/game')
      const game = await getIdRequest.data
      router.replace(`/studio/${game.id}`)
    }

    redirect().catch(console.error)
  }, [router])

  return (
    <div>
      <Spinner className="mx-auto" />
    </div>
  )
}

export default NewQuest
