import { useState } from 'react'
import { useS3Upload, getImageData } from 'next-s3-upload'
import Image from 'next/image'
import { Button } from '../Elements/Button'

type FileUploadProps = {
  onChange: (url: string) => any
  roomId: string
}

export default function FileUpload({ onChange, roomId }: FileUploadProps) {
  let [imageUrl, setImageUrl] = useState('')
  let [height, setHeight] = useState<number | undefined>(0)
  let [width, setWidth] = useState<number | undefined>(0)
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
    let { height, width } = await getImageData(file)
    setWidth(width)
    setHeight(height)
    setImageUrl(url)

    onChange(url)
  }

  return (
    <div>
      <FileInput onChange={handleFileChange} />

      <Button onClick={openFileDialog}>Upload file</Button>
    </div>
  )
}
