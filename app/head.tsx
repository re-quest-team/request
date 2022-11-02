import Script from 'next/script'

export default function Head() {
  return (
    <>
      <link rel="icon" href="/favicon.svg" />
      <Script
        async
        defer
        data-website-id="841fe53d-0f98-4373-a901-76a9337432fe"
        src="https://umami-eta-one.vercel.app/umami.js"
      ></Script>
    </>
  )
}
