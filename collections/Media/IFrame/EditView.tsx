import { useIframeStore } from '@/collections/Media/IFrame/store'
import { TextArea } from '@/components/Elements/FormElements/TextArea'
import { InputField } from '@/components/Elements/FormElements'
import { isArgumentElement } from '@formatjs/icu-messageformat-parser'
import { useIntl } from 'react-intl'

const EditView = () => {
  const intl = useIntl();
  const link = useIframeStore(state => state.link);
  const width = useIframeStore(state => state.width);
  const height = useIframeStore(state => state.height);
  const setLink = useIframeStore(state => state.setLink);
  const setHeight = useIframeStore(state => state.setLink);
  const setWidth = useIframeStore(state => state.setLink);
  const frame = document.getElementById('iframeID');

  return (
    <div>
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

      <div>
        <InputField
          label={intl.formatMessage({ id: 'media.iframe.editView.width' })}
          type={'text'}
          placeholder={'100'}
          defaultValue={width}
          onChange={e => {
            frame && frame.setAttribute('width', e.currentTarget.value)
            setWidth(e.currentTarget.value)
          }}
        />

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
      </div>
      <iframe
        id="iframeID"
        className="relative w-full overflow-hidden pr-12"
        width={'100%'}
        height={'500'}
      ></iframe>
    </div>
  )
}

export default EditView
