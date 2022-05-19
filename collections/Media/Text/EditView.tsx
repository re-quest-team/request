import { TextArea } from '@/components/Elements/FormElements'
import { useTextStore } from './store'

const EditView = () => {
  const text = useTextStore(state => state.text)
  const setText = useTextStore(state => state.setText)

  return (
    <div>
      <TextArea
        label="Text"
        defaultValue={text}
        onChange={e => setText(e.target.value)}
        rows={4}
      ></TextArea>
    </div>
  )
}

export default EditView
