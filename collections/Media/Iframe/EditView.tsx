import { useIframeStore } from './store'
import { TextArea } from '@/components/Elements/FormElements/TextArea'
import { InputField } from '@/components/Elements/FormElements'

const EditView = () => {
  const link = useIframeStore(state => state.link)
  const setLink = useIframeStore(state => state.setLink)
  const title = useIframeStore(state => state.title)
  const setTitle = useIframeStore(state => state.setTitle)

  return (
    <>
      <InputField
        type={'text'}
        defaultValue={title}
        onChange={e => setTitle(e.target.value)}
      />
      <TextArea
        label="Website URL"
        defaultValue={link}
        onChange={e => setLink(e.target.value)}
        rows={4}
      ></TextArea>
    </>
  )
}

export default EditView
