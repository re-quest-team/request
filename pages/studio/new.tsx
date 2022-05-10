import { Spinner } from '@/components/Elements/Spinner'
import axios from '@/lib/axios'
import { Game } from '@prisma/client'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const NewQuest = () => {
  const router = useRouter()

  useEffect(() => {
    const redirect = async () => {
      console.log('creating new game')
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
