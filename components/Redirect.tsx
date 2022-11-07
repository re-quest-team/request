'use client'

import { Spinner } from '@/components/Elements/Spinner'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Redirect({ to }: { to: string }) {
  const router = useRouter()

  useEffect(() => {
    router.replace(to)
  }, [to, router])

  return <Spinner />
}
