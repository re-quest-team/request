import React from 'react'
import YoutubeEmbed from '@/collections/Media/Youtube/YoutubeEmbed'
import {
  useYoutubeStoreEmbedLink,
  useYoutubeStoreStartTimestamp,
  useYoutubeStoreEndTimestamp,
  Timestamp,
} from './store'

const sumToSec = (state: Timestamp) => {
  const hrs = parseInt(state.hrs)
  const min = parseInt(state.min)
  const sec = parseInt(state.sec)

  return (
    (hrs != undefined ? hrs * 3600 : 0) +
    (min != undefined ? min * 60 : 0) +
    (sec != undefined ? sec : 0)
  )
}

const PlayView = () => {
  const link = useYoutubeStoreEmbedLink(state => state.store)
  const start = useYoutubeStoreStartTimestamp(start => start.store)
  const end = useYoutubeStoreEndTimestamp(end => end.store)

  const startTime = sumToSec(start)
  console.log('Start time: ' + startTime)
  const endTime = sumToSec(end)
  console.log('End time: ' + endTime)

  return (
    <div>
      <YoutubeEmbed embedLink={link} startTime={0} endTime={0} />
    </div>
  )
}

export default PlayView
