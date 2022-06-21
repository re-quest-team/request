import { useImageStore } from './store'
import Image from 'next/image'
import React from 'react'
import { useIntl } from 'react-intl'

const PlayView = () => {
  const intl = useIntl()
  const link = useImageStore(state => state.link)

  return (
    <div>
      <Image
        alt={intl.formatMessage({ id: 'media.image.PlayView.alt' })}
        src={link}
        width={300}
        height={180}
        layout="responsive"
      />
    </div>
  )
}

export default PlayView
