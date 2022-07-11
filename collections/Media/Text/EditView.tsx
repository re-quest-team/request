import { TextArea } from '@/components/Elements/FormElements'
import { useTextStore } from './store'
import { useIntl } from 'react-intl'

const EditView = () => {
  const intl = useIntl()

  const text = useTextStore(state => state.text)
  const setText = useTextStore(state => state.setText)

  return (
    <div>
      <TextArea
        label={intl.formatMessage({ id: 'editView.title' })}
        defaultValue={text}
        onChange={e => setText(e.target.value)}
        rows={4}
      ></TextArea>
    </div>
  )
}

export default EditView
