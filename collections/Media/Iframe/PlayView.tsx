import { useIframeStore } from './store'

const PlayView = () => {
  const link = useIframeStore(state => state.link)
  const title = useIframeStore(state => state.title)

  return (
    <div className="text-center">
      <h3 className="text-2xl">{title}</h3>
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
