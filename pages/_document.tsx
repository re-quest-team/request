import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html className="bg-zinc-900">
      <Head>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
