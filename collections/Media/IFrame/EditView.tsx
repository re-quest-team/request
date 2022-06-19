import { useIframeStore } from '@/collections/Media/IFrame/store'
import { TextArea } from '@/components/Elements/FormElements/TextArea'

const EditView = () => {
  const link = useIframeStore(state => state.link)
  const setLink = useIframeStore(state => state.setLink)
  return (
    <TextArea
      label="Website URL"
      defaultValue={link}
      onChange={e => setLink(e.target.value)}
      rows={4}
    ></TextArea>
  )
}

export default EditView
