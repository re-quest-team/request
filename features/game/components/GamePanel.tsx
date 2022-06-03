import { Button } from '@/components/Elements/Button'
import Select from '@/components/Elements/Select'
import Panel from '@/components/Panel'
import { Game } from '@prisma/client'
import Link from 'next/link'
import { useEffect, createRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useSWRConfig } from 'swr'
import { deleteGame } from '../api/deleteGame'
import { SelectOption } from '@/components/Elements/Select'
import { DocumentDownloadIcon } from '@heroicons/react/solid'
import QRCodeStyling from 'qr-code-styling'

const qrOptions: SelectOption[] = [
  { value: 'PNG' },
  { value: 'SVG' },
  { value: 'PDF' },
]

const qrCode = new QRCodeStyling({
  width: 500,
  height: 500,
  dotsOptions: {
    color: 'rgb(24 24 27)',
    type: 'rounded',
  },
  imageOptions: {
    hideBackgroundDots: false,
    margin: 20,
  },
})

const GamePanel = ({ id, name, description }: Game) => {
  const { mutate } = useSWRConfig()
  const [hostname, setHostname] = useState('')
  const [fileExt, setFileExt] = useState(qrOptions[0])
  const qrRef = createRef<HTMLDivElement>()

  const onDelete = async () => {
    const deleteGameRequest = deleteGame(id)

    toast.promise(deleteGameRequest, {
      loading: 'Löschen',
      success: 'Erfolgreich gelöscht',
      error: 'Fehler beim löschen',
    })

    await mutate(`/api/game`, (await deleteGameRequest).data, {
      populateCache: false,
      revalidate: true,
    })
  }

  const onDownload = () => {
    qrCode.download({
      // @ts-ignore
      extension: fileExt.value,
    })
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHostname(window.location.origin)
    }
  }, [])

  useEffect(() => {
    // @ts-ignore
    qrCode.append(qrRef.current)
  }, [qrRef])

  useEffect(() => {
    // Todo only the last qr code gets used
    qrCode.update({
      data: `${hostname}/play/${id}`,
      // TODO proper way to get the image url. It MUST be a url....
      image:
        'https://raw.githubusercontent.com/re-quest-team/request/e288576a3778a34b817cf01e9ca2398e1c40ebd2/assets/logos/request-logo-single.svg',
    })
  }, [hostname, id])

  return (
    <Panel type="quest" header={name || ''} onDelete={onDelete}>
      <>
        <div className="relative my-4 w-full rounded">
          <div className="flex w-full flex-col justify-between">
            <div>
              <p>{description}</p>
            </div>
            <div className="flex w-full flex-row">
              <Link href={`/studio/${id}`} passHref>
                <Button>Bearbeiten</Button>
              </Link>
              <div className="flex w-full flex-row justify-end">
                <Select options={qrOptions} onSelect={setFileExt} />

                <Button
                  onClick={onDownload}
                  endIcon={<DocumentDownloadIcon className="h-4" />}
                >
                  Download
                </Button>

                <Link href={`/play/${id}`} passHref>
                  <Button className="ml-4">Spielen</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    </Panel>
  )
}
export default GamePanel
