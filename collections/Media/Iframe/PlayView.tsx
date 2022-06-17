import { useIframeStore } from './store'

const PlayView = () => {
  const link = useIframeStore(state => state.link)
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
