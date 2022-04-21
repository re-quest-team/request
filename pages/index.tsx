import { Button } from '@/components/Elements/Button'
import { Spacer } from '@/components/Elements/Spacer'
import type { NextPage } from 'next'
import { ArrowRightIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import {
  AcademicCapIcon,
  AdjustmentsIcon,
  CollectionIcon,
  DeviceMobileIcon,
  PuzzleIcon,
  SearchIcon,
} from '@heroicons/react/outline'
import FeatureCard from '@/components/Card'

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
      <div className="flex flex-wrap">
        <FeatureCard
          title="Spannende Abenteuer"
          color="bg-red-700"
          icon={SearchIcon}
        >
          <>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua.
          </>
        </FeatureCard>
        <FeatureCard
          title="Digitale Bildung"
          color="bg-blue-700"
          icon={AcademicCapIcon}
        >
          <>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua.
          </>
        </FeatureCard>
        <FeatureCard
          title="Modulare Rätsel"
          color="bg-purple-700"
          icon={CollectionIcon}
        >
          <>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua.
          </>
        </FeatureCard>
        <FeatureCard
          title="Frei konfigurierbar"
          color="bg-green-700"
          icon={AdjustmentsIcon}
        >
          <>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua.
          </>
        </FeatureCard>
        <FeatureCard
          title="Keine Installation"
          color="bg-yellow-700"
          icon={DeviceMobileIcon}
        >
          <>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua.
          </>
        </FeatureCard>
        <FeatureCard
          title="Physische Elemente"
          color="bg-red-700"
          icon={PuzzleIcon}
        >
          <>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua.
          </>
        </FeatureCard>
      </div>
    </div>
  )
}

export default Home
