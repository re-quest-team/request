import Script from 'next/script'

export default function Head() {
  return (
    <>
      <title>re:quest - Digitale Escape Games für Bildungseinrichtungen</title>
      <meta
        name="description"
        content="Erstelle Digitale Escape Games für Deine Bildungseinrichtung und vermittle spielerisch Inhalte"
      />
      <meta
        property="og:title"
        content="re:quest - Digitale Escape Games für Bildungseinrichtungen"
      />
      <meta
        property="og:description"
        content="Erstelle Digitale Escape Games für Deine Bildungseinrichtung und vermittle spielerisch Inhalte"
      />
      <meta
        property="og:image"
        content={require('@/assets/logos/request-logo.svg').default.src}
      />
      <meta property="og:url" content="https://request.reedu.de/" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="re:quest" />
      <meta
        name="keywords"
        content="escape, game, room, digitale, bildung, museum"
      />
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
