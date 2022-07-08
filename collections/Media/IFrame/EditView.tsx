import { useIframeStore } from '@/collections/Media/IFrame/store'
import { TextArea } from '@/components/Elements/FormElements/TextArea'
import { InputField } from '@/components/Elements/FormElements'
import { isArgumentElement } from '@formatjs/icu-messageformat-parser'
import { useIntl } from 'react-intl'

const EditView = () => {
  const intl = useIntl()
  const title = useIframeStore(state => state.title)
  const link = useIframeStore(state => state.link)
  const height = useIframeStore(state => state.height)
  const setTitle = useIframeStore(state => state.setTitle)
  const setLink = useIframeStore(state => state.setLink)
  const setHeight = useIframeStore(state => state.setLink)
  const frame = document.getElementById('iframeID')

  return (
    <>
      <InputField
        type={'text'}
        defaultValue={title}
        onChange={e => setTitle(e.target.value)}
      />
      <TextArea
        label={intl.formatMessage({ id: 'media.iframe.editView.label' })}
        id="URL"
        defaultValue={link}
        onChange={e => {
          frame && frame.setAttribute('src', e.currentTarget.value)
          setLink(e.currentTarget.value)
        }}
        rows={4}
      ></TextArea>

      <InputField
        label={intl.formatMessage({ id: 'media.iframe.editView.height' })}
        type={'text'}
        placeholder={'500'}
        defaultValue={height}
        onChange={e => {
          frame && frame.setAttribute('height', e.currentTarget.value)
          setHeight(e.currentTarget.value)
        }}
      />
      <iframe
        id="iframeID"
        className="relative w-full overflow-hidden pr-12"
        width={'100%'}
        height={'500'}
      ></iframe>
    </>
  )
}

export default EditView
