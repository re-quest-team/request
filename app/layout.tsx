import { Spacer } from '@/components/Elements/Spacer'
import Navbar from '@/components/Navbar'
import { SessionProvider } from 'next-auth/react'
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
        <Providers>
          <Navbar />
          <Spacer />
          <main className="container mx-auto p-4">{children}</main>
        </Providers>
      </body>
    </html>
  )
}
