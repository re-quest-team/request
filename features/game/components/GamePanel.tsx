import { Button } from '@/components/Elements/Button'
import Select, { SelectOption } from '@/components/Elements/Select'
import Panel from '@/components/Panel'
import { Game } from '@prisma/client'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useSWRConfig } from 'swr'
import { deleteGame } from '../api/deleteGame'
import { FormattedMessage, useIntl } from 'react-intl'
import { deleteToast } from '@/components/Toasts'
import { DocumentDownloadIcon } from '@heroicons/react/solid'
import 'node-self'
import QRCodeStyling, { FileExtension } from 'qr-code-styling'
import QrCodeConfig from '@/features/game/components/QrCode/QrCodeConfig'
import PdfTemplate, {
  containerStyle,
} from '@/features/game/components/QrCode/PdfTemplate'
import html2canvas from 'html2canvas'
import JsPdf from 'jspdf'

const qrOptions: SelectOption[] = [
  { value: 'PNG' },
  { value: 'SVG' },
  { value: 'PDF' },
]

const GamePanel = ({ id, name, description, germanLanguage }: Game) => {
  const intl = useIntl()

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

    deleteToast(deleteGameRequest, intl)

    await mutate(`/api/game`, (await deleteGameRequest).data, {
      populateCache: false,
      revalidate: true,
    })
  }

  const english = intl.formatMessage({ id: 'languages.english' })
  const german = intl.formatMessage({ id: 'languages.german' })

  const pdfDoc = useRef<HTMLDivElement>(null)
  const [imgUrl, setImgUrl] = useState('')

  const getImageUrl = async () => {
    return await require('assets/logos/request-logo-single.svg')
  }

  getImageUrl().then(props => {
    setImgUrl(props.default.src)
  })

  const qrCode = (size: number) => {
    return new QRCodeStyling(
      QrCodeConfig({
        url: `${hostname}/play/${id}`,
        imageUrl: imgUrl,
        size: size,
      }),
    )
  }

  const onQrLoad = (e: HTMLDivElement | null) => {
    if (e != null && hostname != '' && e.children.length == 0)
      e.appendChild(qrCode(287)._canvas as HTMLCanvasElement)
  }

  const onDownload = () => {
    const fileName = `request-qr-code_${fileExt.value}_${id}`

    if (fileExt.value != 'PDF') {
      qrCode(1000).download({
        name: fileName,
        extension: fileExt.value.toLowerCase() as FileExtension,
      })
    } else {
      const pdf = new JsPdf()
      html2canvas(pdfDoc.current as HTMLElement).then(canvas => {
        const imgData = canvas.toDataURL('image/png')
        pdf.addImage(imgData, 'PNG', 0, 0, 210, 297, 'pdf', 'NONE', 0)
        pdf.save(`${fileName}.pdf`)
      })
    }
  }

  return (
    <Panel
      type="quest"
      header={(name || '') + ' (' + (germanLanguage ? german : english) + ')'}
      onDelete={onDelete}
    >
      <>
        <div className="relative my-4 w-full rounded">
          <div className="flex w-full flex-col">
            <div className="flex w-full flex-row justify-between">
              <p>{description}</p>
              <div ref={onQrLoad} className="rounded bg-white p-1" />
            </div>
            <div className="mt-4 flex flex-row">
              <Link href={`/studio/${id}`} passHref>
                <Button>
                  <FormattedMessage id="features.game.gamePanel.edit" />
                </Button>
              </Link>
              <div className="flex w-full flex-row justify-end">
                <div className="mb-1">
                  <Select options={qrOptions} onSelect={setFileExt} />
                </div>
                <Button
                  onClick={onDownload}
                  endIcon={<DocumentDownloadIcon className="h-4" />}
                >
                  <FormattedMessage id="features.game.gamePanel.download" />
                </Button>

                <Link href={`/play/${id}`} passHref>
                  <Button className="ml-4">
                    <FormattedMessage id="features.game.gamePanel.play" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div ref={pdfDoc} style={containerStyle}>
            <PdfTemplate
              name={name}
              description={description}
              onQrLoad={onQrLoad}
            />
          </div>
        </div>
      </>
    </Panel>
  )
}
export default GamePanel
