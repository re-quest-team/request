import { useS3Upload } from 'next-s3-upload'
import { useState } from 'react'
import { Button } from '../Elements/Button'
import { FormattedMessage } from 'react-intl'
import useRoom from '@/features/room/api/useRoom'

type FileUploadProps = {
  onChange: (_url: string) => void
  roomId: string
}

export default function FileUpload({ onChange, roomId }: FileUploadProps) {
  let { FileInput, openFileDialog, uploadToS3 } = useS3Upload()

  const { onImageChange } = useRoom(roomId)

  const [loading, setLoading] = useState(false)

  let handleFileChange = async (file: File) => {
    setLoading(true)
    let { url } = await uploadToS3(file, {
      endpoint: {
        request: {
          body: {
            roomId,
          },
          headers: {},
        },
      },
    })

    onChange(url.replace(`${process.env.NEXT_PUBLIC_S3_BASE_URL!}/`, ''))
    onImageChange()
    setLoading(false)
  }

  return (
    <div>
      <FileInput onChange={handleFileChange} />
      <Button onClick={openFileDialog} isLoading={loading} disabled={loading}>
        <FormattedMessage id="fileUpload.imageUpload" />
      </Button>
    </div>
  )
}
