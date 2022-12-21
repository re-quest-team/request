import Providers from './providers'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head></head>
      <body className="h-full bg-zinc-900 text-white">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
