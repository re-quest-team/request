import { useInstagramStore } from './store'

const PlayView = () => {
  const link = useInstagramStore(state => state.link) + '/embed'
  return (
    <div className="text-center">
      <iframe
        className="relative w-full overflow-hidden pr-12"
        width={'400px'}
        height={'720px'}
        src={link}
      >
        <div className="text-center">error 404</div>
      </iframe>
    </div>
  )
}
export default PlayView
