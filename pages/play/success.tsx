import { Button } from '@/components/Elements/Button'
import Modal from '@/components/Modal'
import { useGameplayStore } from '@/stores/gameplay'
import { formatDuration } from 'date-fns'
import Link from 'next/link'
import Particles from 'react-tsparticles'
import { Engine } from 'tsparticles-engine'
import { loadSeaAnemonePreset } from 'tsparticles-preset-sea-anemone'

import { de } from 'date-fns/locale'

const Success = () => {
  const { getDuration } = useGameplayStore()

  const particlesInit = async (main: Engine) => {
    await loadSeaAnemonePreset(main)
  }

  return (
    <>
      <Particles
        options={{
          preset: 'seaAnemone',
        }}
        init={particlesInit}
      />
      <Modal
        open={true}
        onClose={() => {}}
        title={'Rätsel gelöst'}
        backdrop="hidden"
      >
        <div className="text-center">
          <div>
            <b>Dauer</b>:{' '}
            {formatDuration(getDuration(), {
              locale: de,
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
