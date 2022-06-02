import { Button } from '@/components/Elements/Button'
import Panel from '@/components/Panel'
import { Game } from '@prisma/client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import QRCode from 'react-qr-code'
import { useSWRConfig } from 'swr'
import { deleteGame } from '../api/deleteGame'
import { useIntl } from 'react-intl'
import { deleteToast } from '@/components/Toasts'

const GamePanel = ({ id, name, description }: Game) => {
  const intl = useIntl()

  const { mutate } = useSWRConfig()

  const [hostname, setHostname] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHostname(window.location.origin)
    }
  }, [])

  const onDelete = async () => {
    const deleteGameRequest = deleteGame(id)

    deleteToast(deleteGameRequest, intl)

    await mutate(`/api/game`, (await deleteGameRequest).data, {
      populateCache: false,
      revalidate: true,
    })
  }

  return (
    <Panel type="quest" header={name || ''} onDelete={onDelete}>
      <>
        <div className="relative my-4 w-full rounded">
          <div className="flex w-full flex-row justify-between">
            <div>
              <p>{description}</p>
              <Link href={`/studio/${id}`} passHref>
                <Button>Bearbeiten</Button>
              </Link>
            </div>
            <div>
              <div className="m-4 rounded-lg bg-white p-8 shadow">
                <QRCode value={`${hostname}/play/${id}`} />
              </div>
              <Link href={`/play/${id}`} passHref>
                <Button>Spielen</Button>
              </Link>
            </div>
          </div>
        </div>
      </>
    </Panel>
  )
}
export default GamePanel
