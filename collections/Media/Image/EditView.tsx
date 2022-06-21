import { TextArea } from '@/components/Elements/FormElements'
import { useImageStore } from './store'
import { useIntl } from 'react-intl'

const EditView = () => {
  const intl = useIntl()

  const link = useImageStore(state => state.link)
  const setLink = useImageStore(state => state.setLink)

  return (
    <div>
      <TextArea
        label={intl.formatMessage({ id: 'media.image.editView.title' })}
        defaultValue={link}
        placeholder={'URL'}
        onChange={e => setLink(e.target.value)}
        rows={6}
      ></TextArea>
    </div>
  )
}

export default EditView
