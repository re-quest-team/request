import { Button } from '@/components/Elements/Button'
import Select, { SelectOption } from '@/components/Elements/Select'
import Panel from '@/components/Panel'
import { Game } from '@prisma/client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useSWRConfig } from 'swr'
import { deleteGame } from '../api/deleteGame'
import { DocumentDownloadIcon } from '@heroicons/react/solid'
import QRCodeStyling from 'qr-code-styling'

const qrOptions: SelectOption[] = [
  { value: 'PNG' },
  { value: 'SVG' },
  { value: 'PDF' },
]

const QRCode = (url: string, imageUrl: string) => {
  return new QRCodeStyling({
    width: 1000,
    height: 1000,
    dotsOptions: {
      //color: 'rgb(24 24 27)',
      gradient: {
        type: 'linear',
        rotation: 45,
        colorStops: [
          { offset: 0, color: '#622d28' },
          { offset: 1, color: '#6d4072' },
        ],
      },
      type: 'rounded',
    },
    imageOptions: {
      imageSize: 0.2,
      margin: 15,
    },
    data: url,
    image: imageUrl,
  })
}

const GamePanel = ({ id, name, description }: Game) => {
  const { mutate } = useSWRConfig()

  const [hostname, setHostname] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHostname(window.location.origin)
    }
  }, [])

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

  const [fileExt, setFileExt] = useState(qrOptions[0])

  const qrCode = QRCode(
    `${hostname}/play/${id}`,
    'https://raw.githubusercontent.com/re-quest-team/request/e288576a3778a34b817cf01e9ca2398e1c40ebd2/assets/logos/request-logo-single.svg',
  )

  const onDownload = () => {
    qrCode.download({
      // @ts-ignore
      extension: fileExt.value,
    })
  }

  useEffect(() => {
    qrCode.update({
      data: `${hostname}/play/${id}`,
      // proper way to get the image url. MUST be an url.
      image:
        'https://raw.githubusercontent.com/re-quest-team/request/e288576a3778a34b817cf01e9ca2398e1c40ebd2/assets/logos/request-logo-single.svg',
    })
  }, [hostname, id, qrCode])

  return (
    <Panel type="quest" header={name || ''} onDelete={onDelete}>
      <>
        <div className="relative my-4 w-full rounded">
          <div className="flex w-full flex-col">
            <div>
              <p>{description}</p>
            </div>
            <div className="mt-4 flex flex-row">
              <Link href={`/studio/${id}`} passHref>
                <Button>Bearbeiten</Button>
              </Link>
              <div className="flex w-full flex-row justify-end">
                <div className="mb-1">
                  <Select options={qrOptions} onSelect={setFileExt} />
                </div>
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
