import { Button } from '@/components/Elements/Button'
import { Spacer } from '@/components/Elements/Spacer'
import type { NextPage } from 'next'
import { ArrowRightIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { signIn } from 'next-auth/react'

const Home: NextPage = () => {
  return (
    <div>
      <div className="mx-auto md:max-w-3xl">
        <h1 className="bg-gradient-to-br from-red-500 to-blue-500 bg-clip-text p-2 text-center text-6xl font-bold text-transparent">
          Digitale Abenteuer für Bildungs&shy;einrich&shy;tungen
        </h1>
        <Spacer />
        <h2 className="p-2 text-center text-2xl">
          <span className="font-bold">re:quest</span> ist eine Plattform zum
          Erstellen von digitalen Escape Games für Bildungs&shy;einrichtungen
        </h2>
        <Spacer />
        <Link href={'/studio'} passHref>
          <Button
            endIcon={<ArrowRightIcon className="h-4" />}
            className="mx-auto"
          >
            re:quest erstellen
          </Button>
        </Link>
        <Spacer />
      </div>
    </div>
  )
}

export default Home
