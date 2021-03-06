import { Options } from 'qr-code-styling/lib/types'

type QrCodeConfig = {
  url: string
  imageUrl: string
  size: number
}

const QrCodeConfig = ({ url, imageUrl, size }: QrCodeConfig) => {
  const scale = size / 100

  const opt: Options = {
    width: size,
    height: size,
    cornersSquareOptions: {
      type: 'dot',
      gradient: {
        type: 'linear',
        rotation: 45,
        colorStops: [
          { offset: 0, color: '#e35c53' },
          { offset: 1, color: '#c072c3' },
        ],
      },
    },
    cornersDotOptions: {
      type: 'dot',
      gradient: {
        type: 'linear',
        rotation: 45,
        colorStops: [
          { offset: 0, color: '#d96574' },
          { offset: 1, color: '#ca6ea5' },
        ],
      },
    },
    dotsOptions: {
      type: 'rounded',
      color: '#18181a',
    },
    imageOptions: {
      hideBackgroundDots: true,
      imageSize: 0.2,
      margin: 2 * scale,
    },
    data: url,
    image: imageUrl,
  }
  return opt
}

export default QrCodeConfig
