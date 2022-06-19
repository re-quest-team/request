import { useIframeStore } from '@/collections/Media/IFrame/store'

const PlayView = () => {
  const link = useIframeStore(state => state.link);
  const width = useIframeStore(state => state.width);
  const height = useIframeStore(state => state.height);
  return (
    <div className="text-center">
      <iframe
        className="relative w-full overflow-hidden pr-12"
        width={width}
        height={height}
        src={link}
      >
        <div className="text-center">error 404</div>
      </iframe>
    </div>
  )
}
export default PlayView
