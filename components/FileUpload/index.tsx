import { useS3Upload } from 'next-s3-upload'
import { Button } from '../Elements/Button'

type FileUploadProps = {
  onChange: (url: string) => any
  roomId: string
}

export default function FileUpload({ onChange, roomId }: FileUploadProps) {
  let { FileInput, openFileDialog, uploadToS3 } = useS3Upload()

  let handleFileChange = async (file: File) => {
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
  }

  return (
    <div>
      <FileInput onChange={handleFileChange} />
      <Button onClick={openFileDialog}>Bild hochladen</Button>
    </div>
  )
}
