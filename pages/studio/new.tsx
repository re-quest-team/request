import { Spinner } from '@/components/Elements/Spinner'
import { Quest } from '@prisma/client'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const NewQuest = () => {
  const router = useRouter()

  useEffect(() => {
    const redirect = async () => {
      const response = await fetch('/api/quest', {
        method: 'POST',
      })
      const quest: Quest = await response.json()
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
