import React from 'react'

type YoutubeEmbedProps = {
  embedLink: string
  startTime: number
  endTime: number
}

const YoutubeEmbed = ({ embedLink, startTime, endTime }: YoutubeEmbedProps) => {
  const link = embedLink.substring(
    embedLink.search('src') + 4,
    embedLink.search('title') - 2,
  )

  const end = endTime != 0 ? `&end=${startTime}` : ''

  return (
    <div className="relative h-0 overflow-hidden pb-80">
      <iframe
        className="absolute left-0 top-0 h-full w-full"
        width="853"
        height="480"
        src={link + `?start=${startTime}` + end}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embeded Youtube"
      />
    </div>
  )
}

export default YoutubeEmbed
