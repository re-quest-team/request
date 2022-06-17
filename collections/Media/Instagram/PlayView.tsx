import { useInstagramStore } from './store'

const PlayView = () => {
  const link = useInstagramStore(state => state.link) + '/embed'
  return (
    <div className="text-center">
      <iframe
        className="relative w-full overflow-hidden pr-12"
        height="480"
        src={link}
        frameBorder="0"
      >
        <div className="text-center">error 404</div>
      </iframe>
    </div>
  )
}
export default PlayView
