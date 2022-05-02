import { Spinner } from '@/components/Elements/Spinner'
import { Quest } from '@prisma/client'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const NewQuest = () => {
  const router = useRouter()

  useEffect(() => {
    const redirect = async () => {
      const getIdRequest = await axios.post<Quest>('/api/quest')
      const quest = await getIdRequest.data
      router.replace(`/studio/${quest.id}`)
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
