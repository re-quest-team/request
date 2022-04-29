import { useState } from 'react'
import { useS3Upload, getImageData } from 'next-s3-upload'
import Image from 'next/image'

type FileUploadProps = {
  onChange: (url: string) => any
}

export default function FileUpload({ onChange }: FileUploadProps) {
  let [imageUrl, setImageUrl] = useState('')
  let [height, setHeight] = useState<number | undefined>(0)
  let [width, setWidth] = useState<number | undefined>(0)
  let { FileInput, openFileDialog, uploadToS3 } = useS3Upload()

  let handleFileChange = async (file: File) => {
    let { url } = await uploadToS3(file)
    let { height, width } = await getImageData(file)
    setWidth(width)
    setHeight(height)
    setImageUrl(url)

    onChange(url)
  }

  return (
    <div>
      <FileInput onChange={handleFileChange} />

      <button onClick={openFileDialog}>Upload file</button>
      {/* 
      {imageUrl && (
        <div>
          <Image
            src={imageUrl}
            width={width}
            height={height}
            alt="Uploaded Image"
          />
          <div>{imageUrl}</div>
          <div>
            {height}x{width}
          </div>
        </div>
      )} */}
    </div>
  )
}
