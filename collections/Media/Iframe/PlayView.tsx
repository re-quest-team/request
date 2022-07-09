import { useIframeStore } from '@/collections/Media/Iframe/store'

const PlayView = () => {
  const title = useIframeStore(state => state.title)
  const link = useIframeStore(state => state.link)
  const height = useIframeStore(state => state.height)
  return (
    <div className="text-center">
      <h3 className="text-2xl">{title}</h3>
      <iframe
        className="relative w-full overflow-hidden pr-12"
        height={height}
        src={link}
      >
        <div className="text-center">error 404</div>
      </iframe>
    </div>
  )
}
export default PlayView
