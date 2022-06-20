import { useInstagramStore } from './store'
import { TextArea } from '@/components/Elements/FormElements/TextArea'
import { useIntl } from 'react-intl'

const EditView = () => {
  const intl = useIntl()
  const link = useInstagramStore(state => state.link)
  const setLink = useInstagramStore(state => state.setLink)
  return (
    <TextArea
      label={intl.formatMessage({ id: 'media.instagram.editView.label' })}
      defaultValue={link}
      onChange={e => setLink(e.target.value)}
      rows={4}
    ></TextArea>
  )
}

export default EditView
