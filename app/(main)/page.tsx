'use client'

import { Button } from '@/components/Elements/Button'
import { Spacer } from '@/components/Elements/Spacer'
import type { NextPage } from 'next'
import Link from 'next/link'

import FeatureCard from '@/components/Card'
import { Game } from '@prisma/client'
import useSWR from 'swr'
import GameCard from '@/features/game/components/GameCard'
import { RoomWithImageAndQuests } from '@/features/room/types'
import { FormattedMessage, useIntl } from 'react-intl'
import Image from 'next/image'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import JotformEmbed from 'react-jotform-embed'
import {
  AcademicCapIcon,
  AdjustmentsHorizontalIcon,
  ArrowRightIcon,
  DevicePhoneMobileIcon,
  MagnifyingGlassIcon,
  PuzzlePieceIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/outline'
import { useIntlStore } from '@/stores/intl'
import { RequestGame } from '@/types'
import NonPlayLayout from '@/app/(main)/layout'

const Home = () => {
  const { data: games } = useSWR<RequestGame[]>('/api/public/game')

  const intl = useIntl()

  const lang = useIntlStore(state => state.locale)

  return (
    <>
      <div className="mx-auto md:max-w-3xl">
        <h1 className="bg-gradient-to-br from-flamingo-600 via-dodger-blue-500 to-emerald-600 bg-clip-text p-2 text-center text-6xl font-bold text-transparent">
          <FormattedMessage id="page.home.title" />
        </h1>
        <Spacer />
        <h2 className="p-2 text-center text-2xl">
          <span className="font-bold">re:quest</span>{' '}
          <FormattedMessage id="page.home.description" />
        </h2>
        <Spacer />
        <Link href={'/studio'} passHref>
          <Button
            endIcon={<ArrowRightIcon className="h-4" />}
            className="mx-auto"
          >
            <FormattedMessage id="page.home.createQuest" />
          </Button>
        </Link>
        <Spacer />
      </div>
      <div className="flex flex-wrap">
        <FeatureCard
          title={intl.formatMessage({ id: 'page.home.card1' })}
          color="bg-red-400"
          icon={MagnifyingGlassIcon}
        >
          <FormattedMessage id="page.home.card1text" />
        </FeatureCard>
        <FeatureCard
          title={intl.formatMessage({ id: 'page.home.card2' })}
          color="bg-blue-400"
          icon={AcademicCapIcon}
        >
          <FormattedMessage id="page.home.card2text" />
        </FeatureCard>
        <FeatureCard
          title={intl.formatMessage({ id: 'page.home.card3' })}
          color="bg-purple-400"
          icon={Squares2X2Icon}
        >
          <FormattedMessage id="page.home.card3text" />
        </FeatureCard>
        <FeatureCard
          title={intl.formatMessage({ id: 'page.home.card4' })}
          color="bg-pink-400"
          icon={AdjustmentsHorizontalIcon}
        >
          <FormattedMessage id="page.home.card4text" />
        </FeatureCard>
        <FeatureCard
          title={intl.formatMessage({ id: 'page.home.card5' })}
          color="bg-orange-400"
          icon={DevicePhoneMobileIcon}
        >
          <FormattedMessage id="page.home.card5text" />
        </FeatureCard>
        <FeatureCard
          title={intl.formatMessage({ id: 'page.home.card6' })}
          color="bg-green-400"
          icon={PuzzlePieceIcon}
        >
          <FormattedMessage id="page.home.card6text" />
        </FeatureCard>
      </div>
      <Spacer />
      <Link href={'/faq'} passHref>
        <Button
          endIcon={<ArrowRightIcon className="h-4" />}
          className="mx-auto"
        >
          <FormattedMessage id="page.home.moreInformation" />
        </Button>
      </Link>

      <Spacer size="lg" />
      <h2 className="p-2 text-center text-4xl font-bold">
        {intl.formatMessage({ id: 'page.home.editor.title' })}
      </h2>
      <div className="flex flex-wrap items-center">
        <div className="flex-1 basis-full lg:basis-1/2">
          <p className="lg:mr-4">
            {intl.formatMessage({ id: 'page.home.editor.content' })}
          </p>
        </div>

        <div className="w-full flex-1 basis-full rotate-1 p-4 lg:basis-1/2 xl:translate-x-12 2xl:w-[120%] 2xl:translate-x-24">
          <div className="overflow-hidden rounded-2xl border-2 border-zinc-200">
            <div className="bg-zinc-200 p-2">
              <p className="rounded-full bg-zinc-300 py-1 text-center text-sm text-black md:mx-20">
                re:quest Studio
              </p>
            </div>
            <img
              className="px-8"
              src={require('@/assets/studio.png').default.src}
            />
          </div>
        </div>
      </div>
      <Spacer size="lg" />
      <h2 className="p-2 text-center text-4xl font-bold">
        {intl.formatMessage({ id: 'page.home.studio.title' })}
      </h2>
      <Spacer size="lg" />
      <div className="flex flex-wrap items-center">
        <div className="w-full flex-1 basis-full -rotate-1 p-4 lg:basis-1/2 xl:-translate-x-12 2xl:w-[120%] 2xl:-translate-x-24">
          <div className="overflow-hidden rounded-2xl border-2 border-zinc-200">
            <div className="bg-zinc-200 p-2">
              <p className="mx-20 rounded-full bg-zinc-300 py-1 text-center text-sm text-black">
                re:quest Studio
              </p>
            </div>
            <img
              // className="px-8"
              src={require('@/assets/quest-2.png').default.src}
            />
          </div>
        </div>
        <div className="flex-1 basis-full lg:basis-1/2">
          <p>{intl.formatMessage({ id: 'page.home.studio.content' })}</p>
        </div>
      </div>

      {games && games?.length > 0 && (
        <>
          <Spacer size="lg" />
          <h2 className="p-2 text-center text-2xl">
            <FormattedMessage id="page.home.examples" />
          </h2>
          <div className="flex flex-col flex-wrap md:flex-row">
            {games?.map(g => (
              <GameCard key={g.id} game={g} />
            ))}
          </div>
          <Link href={'/studio'} passHref>
            <Button
              endIcon={<ArrowRightIcon className="h-4" />}
              className="mx-auto"
            >
              <FormattedMessage id="page.home.createQuest" />
            </Button>
          </Link>
        </>
      )}
      <Spacer size="lg" />
      {/* <h2 className="p-2 text-center text-4xl font-bold">
        {intl.formatMessage({ id: 'page.home.interested' })}
      </h2>
      <Spacer size="lg" />
       <p>{intl.formatMessage({ id: 'page.home.stayTuned' })}</p>
      {lang === 'de' ? (
        <JotformEmbed src="https://form.jotformeu.com/221502755387054" />
      ) : (
        <JotformEmbed src="https://form.jotform.com/221522956013348" />
      )} */}
      <Spacer size="lg" />
      <div className="text-center">
        <h2 className="p-2 text-center  font-bold">Powered by</h2>
        <div className="umami--click--reedu-image-link relative mx-auto h-72 w-72 cursor-pointer transition-all hover:scale-105">
          <Link href={'https://reedu.de'} passHref>
            <Image
              src={require('@/assets/logos/reedu.svg')}
              layout="fill"
              alt="reedu"
            />
          </Link>
        </div>
      </div>
    </>
  )
}

export default Home
