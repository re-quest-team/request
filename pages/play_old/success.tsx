import { Button } from '@/components/Elements/Button'
import Modal from '@/components/Modal'
import { useGameplayStore } from '@/stores/gameplay'
import { formatDuration } from 'date-fns'
import Link from 'next/link'
import Particles from 'react-tsparticles'
import type { Engine } from 'tsparticles-engine'
import { loadSeaAnemonePreset } from 'tsparticles-preset-sea-anemone'

import formatLocale from 'lib/formatLocale'
import { useIntlStore } from '@/stores/intl'

const Success = () => {
  const locale = useIntlStore(store => store.locale)

  const { getDuration } = useGameplayStore()

  const particlesInit = async (engine: Engine) => {
    await loadSeaAnemonePreset(engine)
  }

  return (
    <>
      <Particles
        options={{
          preset: 'seaAnemone',
        }}
        // @ts-ignore
        init={particlesInit}
      />
      <Modal open={true} onClose={() => {}} title={''} backdrop="hidden">
        <div className="text-center">
          <div>
            <b>Dauer</b>:{' '}
            {formatDuration(getDuration(), {
              locale: formatLocale(locale),
            })}
          </div>
          <Link href="/">
            <Button className="mx-auto mt-4">Zur Startseite</Button>
          </Link>
        </div>
      </Modal>
    </>
  )
}

export default Success
