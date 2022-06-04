import { Options } from 'qr-code-styling/lib/types'

const QrConfigConfig = (url: string, imageUrl: string) => {
  const test: Options = {
    width: 1000,
    height: 1000,
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
      margin: 15,
    },
    data: url,
    image: imageUrl,
  }
  return test
}

export default QrConfigConfig
