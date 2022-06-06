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
import 'node-self'
import QRCodeStyling, { FileExtension } from 'qr-code-styling'
import QrCodeConfig from '@/features/game/components/QrCode/QrCodeConfig'

const qrOptions: SelectOption[] = [
  { value: 'PNG' },
  { value: 'SVG' },
  { value: 'PDF' },
]

const GamePanel = ({ id, name, description }: Game) => {
  const { mutate } = useSWRConfig()

  const [hostname, setHostname] = useState('')
  const [fileExt, setFileExt] = useState(qrOptions[0])

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

  const qrCode = (size: number) => {
    return new QRCodeStyling(
      QrCodeConfig({
        url: `${hostname}/play/${id}`,
        imageUrl:
          'https://raw.githubusercontent.com/re-quest-team/request/e288576a3778a34b817cf01e9ca2398e1c40ebd2/assets/logos/request-logo-single.svg',
        size: size,
      }),
    )
  }

  const onQrLoad = (e: HTMLDivElement | null) => {
    if (e != null && hostname != '' && e.children.length == 0)
      e.appendChild(qrCode(287)._canvas as HTMLCanvasElement)
  }

  const onDownload = () => {
    qrCode(1000).download({
      name: `request-qr-code_${fileExt.value}_${id}`,
      extension: fileExt.value.toLowerCase() as FileExtension,
    })
  }

  return (
    <Panel type="quest" header={name || ''} onDelete={onDelete}>
      <>
        <div className="relative my-4 w-full rounded">
          <div className="flex w-full flex-col">
            <div className="flex w-full flex-row justify-between">
              <p>{description}</p>
              <div ref={onQrLoad} className="rounded bg-white p-1" />
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
