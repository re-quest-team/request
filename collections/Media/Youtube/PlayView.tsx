import React from 'react'
import YoutubeEmbed from '@/collections/Media/Youtube/YoutubeEmbed'
import { useYoutubeStore } from './store'

const PlayView = () => {
  const link = useYoutubeStore(state => state.link)
  const start = useYoutubeStore(start => start.start)
  const end = useYoutubeStore(end => end.end)

  return (
    <div>
      <YoutubeEmbed embedLink={link} startTime={start} endTime={end} />
    </div>
  )
}

export default PlayView
