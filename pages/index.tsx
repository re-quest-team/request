import { Button } from '@/components/Elements/Button'
import { Spacer } from '@/components/Elements/Spacer'
import type { NextPage } from 'next'
import { ArrowRightIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

const Home: NextPage = () => {
  const { data: session, status } = useSession()

  return (
    <div>
      <div className="mx-auto md:max-w-3xl">
        <h1 className="bg-gradient-to-br from-red-500 to-blue-500 bg-clip-text p-2 text-center text-6xl font-bold text-transparent">
          Digitale Abenteuer für Bildungseinrichtungen
        </h1>
        <Spacer />
        <h2 className="p-2 text-center text-2xl">
          <span className="font-bold">re:quest</span> ist eine Plattform zum
          Erstellen von digitalen Escape Games für Bildungseinrichtungen
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
        <div>
          <Link
            href={session ? '/api/auth/signout' : '/api/auth/signin'}
            passHref
          >
            <Button
              endIcon={<ArrowRightIcon className="h-4" />}
              className="mx-auto"
            >
              {session ? 'Logout' : 'Login'}
            </Button>
          </Link>
          <p>{JSON.stringify(session) || 'Nicht eingeloggt'}</p>
        </div>
      </div>
    </div>
  )
}

export default Home
