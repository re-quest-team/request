import { useImageStore } from './store'
import React from 'react'
import { useIntl } from 'react-intl'

const PlayView = () => {
  const intl = useIntl()
  const link = useImageStore(state => state.link)

  return (
    <div className="w-full">
      <img
        src={link}
        alt={intl.formatMessage({ id: 'media.image.PlayView.alt' })}
        className="w-full rounded-xl object-cover"
      />
    </div>
  )
}

export default PlayView
