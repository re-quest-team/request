import { Button } from '@/components/Elements/Button'
import Modal from '@/components/Modal'
import { useGameplayStore } from '@/stores/gameplay'
import { formatDuration } from 'date-fns'
import Link from 'next/link'
import Particles from 'react-tsparticles'
import type { Engine } from 'tsparticles-engine'
import { loadSeaAnemonePreset } from 'tsparticles-preset-sea-anemone'

import { FormattedMessage, useIntl } from 'react-intl'
import formatLocale from 'lib/formatLocale'

const Success = () => {
  const intl = useIntl()

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
      <Modal
        open={true}
        onClose={() => {}}
        title={intl.formatMessage({ id: 'page.play.questSolved' })}
        backdrop="hidden"
      >
        <div className="text-center">
          <div>
            <b>
              <FormattedMessage id="page.play.duration" />
            </b>
            :{' '}
            {formatDuration(getDuration(), {
              locale: formatLocale(),
            })}
          </div>
          <Link href="/">
            <Button className="mx-auto mt-4">
              <FormattedMessage id="page.play.toHome" />
            </Button>
          </Link>
        </div>
      </Modal>
    </>
  )
}

export default Success
