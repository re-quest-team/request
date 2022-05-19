import { useTextStore } from './store'

const PlayView = () => {
  const text = useTextStore(state => state.text)

  return (
    <div>
      <p>{text}</p>
    </div>
  )
}

export default PlayView
