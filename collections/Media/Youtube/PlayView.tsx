import React from 'react'
import { useYoutubeStore } from './store'
import { Timestamp } from '@/collections/Media/Youtube/store'

const sumToSec = (time: Timestamp) => {
  return (
    (time.hrs != '' ? parseInt(time.hrs) * 3600 : 0) +
    (time.min != '' ? parseInt(time.min) * 60 : 0) +
    (time.sec != '' ? parseInt(time.sec) : 0) +
    ''
  )
}

const PlayView = () => {
  const baseLink = useYoutubeStore(state => state.link)
  const start = sumToSec(useYoutubeStore(start => start.start))
  const end = sumToSec(useYoutubeStore(end => end.end))

  const startInSec = `?start=${start}`
  const endInSec = end != '0' ? `&end=${end}` : ''

  const link = baseLink + startInSec + endInSec

  return (
    <div>
      <iframe
        className="relative w-full overflow-hidden pr-12"
        height="480"
        src={link}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embeded Youtube"
      />
    </div>
  )
}

export default PlayView
