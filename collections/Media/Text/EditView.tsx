import { TextArea } from '@/components/Elements/FormElements'
import { useTextStore } from './store'
import { useIntl } from 'react-intl'

const EditView = () => {
  const intl = useIntl()

  const label = intl.formatMessage({ id: 'media.text.editView.title' })

  const text = useTextStore(state => state.text)
  const setText = useTextStore(state => state.setText)

  return (
    <div>
      <TextArea
        label={label}
        defaultValue={text}
        onChange={e => setText(e.target.value)}
        rows={4}
      ></TextArea>
    </div>
  )
}

export default EditView
