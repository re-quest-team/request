import React from 'react'
import { Timestamp } from '@/collections/Media/Youtube/store'

type YoutubeEmbedProps = {
  embedLink: string
  startTime: Timestamp
  endTime: Timestamp
}

const sumToSec = (time: Timestamp) => {
  console.log('Timestamp: ' + time.hrs + ':' + time.min + ':' + time.sec)

  return (
    (time.hrs != undefined ? parseInt(time.hrs) * 3600 : 0) +
    (time.min != undefined ? parseInt(time.min) * 60 : 0) +
    (time.sec != undefined ? parseInt(time.sec) : 0) +
    ''
  )
}

const YoutubeEmbed = ({ embedLink, startTime, endTime }: YoutubeEmbedProps) => {
  const link = embedLink.substring(
    embedLink.search('src') + 4,
    embedLink.search('title') - 2,
  )

  const startInSec = sumToSec(startTime)
  const endInSec = sumToSec(endTime)

  const start = `${startInSec}` + ''
  const end = endInSec != '0' ? `&end=${startTime}` : ''

  return (
    <div className="relative h-0 overflow-hidden pb-80">
      <iframe
        className="absolute left-0 top-0 h-full w-full"
        width="853"
        height="480"
        src={link + start + end}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embeded Youtube"
      />
    </div>
  )
}

export default YoutubeEmbed
