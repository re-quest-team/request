import { InputField, TextArea } from '@/components/Elements/FormElements'
import {
  useYoutubeStoreEmbedLink,
  useYoutubeStoreStartTimestamp,
  useYoutubeStoreEndTimestamp,
} from './store'

const EditView = () => {
  const link = useYoutubeStoreEmbedLink(link => link.store)
  const setLink = useYoutubeStoreEmbedLink(link => link.setStore)

  const start = useYoutubeStoreStartTimestamp(start => start.store)
  const setStart = useYoutubeStoreStartTimestamp(start => start.setStore)

  const end = useYoutubeStoreEndTimestamp(end => end.store)
  const setEnd = useYoutubeStoreEndTimestamp(end => end.setStore)

  return (
    <div>
      <TextArea
        label="Add Youtube Embed-link"
        defaultValue={link}
        onChange={e => setLink(e.target.value)}
        rows={4}
      />
      <div className="flex flex-row justify-between">
        <div>
          <p className="text-sm" style={{ marginBottom: '-8px' }}>
            Startzeit
          </p>
          <div className="flex flex-row justify-between">
            <InputField
              type={'text'}
              placeholder={'h'}
              defaultValue={start.hrs}
              onChange={e =>
                setStart({
                  hrs: e.target.value,
                  min: start.min,
                  sec: start.sec,
                })
              }
            />
            <InputField
              type={'text'}
              placeholder={'m'}
              defaultValue={start.min}
              onChange={e =>
                setStart({
                  hrs: start.hrs,
                  min: e.target.value,
                  sec: start.sec,
                })
              }
            />
            <InputField
              type={'text'}
              placeholder={'s'}
              defaultValue={start.sec}
              onChange={e =>
                setStart({
                  hrs: start.hrs,
                  min: start.min,
                  sec: e.target.value,
                })
              }
            />
          </div>
        </div>

        <div className="px-8" />

        <div>
          <p className="text-sm" style={{ marginBottom: '-8px' }}>
            Endzeit
          </p>
          <div className="flex w-1/2 flex-row justify-between">
            <InputField
              type={'text'}
              placeholder={'h'}
              defaultValue={''}
              onChange={e =>
                setEnd({ hrs: e.target.value, min: end.min, sec: end.sec })
              }
            />
            <InputField
              type={'text'}
              placeholder={'m'}
              defaultValue={end.min}
              onChange={e =>
                setEnd({ hrs: end.hrs, min: e.target.value, sec: end.sec })
              }
            />
            <InputField
              type={'text'}
              placeholder={'s'}
              defaultValue={end.sec}
              onChange={e =>
                setEnd({ hrs: end.hrs, min: end.min, sec: e.target.value })
              }
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditView
/*

 */
