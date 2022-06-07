import { useInstagramStore } from './store'
import { TextArea } from '@/components/Elements/FormElements/TextArea'

const EditView = () => {
  const link = useInstagramStore(state => state.link)
  const setLink = useInstagramStore(state => state.setLink)
  return (
      <TextArea
        label="Add Instagram Embed-link:"
        defaultValue={link}
        onChange={e => setLink(e.target.value)}
        rows={4}
      ></TextArea>
  )
}

export default EditView
