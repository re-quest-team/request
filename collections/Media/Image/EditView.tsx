import { TextArea } from '@/components/Elements/FormElements'
import { useImageStore } from './store'
import { useIntl } from 'react-intl'
import S3Upload from '@/pages/api/s3-upload'
import FileUpload from '@/components/FileUpload'

const EditView = () => {
  const intl = useIntl()

  const link = useImageStore(state => state.link)
  const setLink = useImageStore(state => state.setLink)

  return (
    <div>
      <p>{intl.formatMessage({ id: 'playView.alt' })}</p>
      {/* <FileUpload
        onChange={url =>
          setLink(`${process.env.NEXT_PUBLIC_S3_BASE_URL}/${url}`)
        }
        roomId={''}
      /> */}
    </div>
  )
}

export default EditView
