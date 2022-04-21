import Head from 'next/head'
import { Spacer } from './Elements/Spacer'
import Navbar from './Navbar'

export type LayoutProps = {
  children: React.ReactElement
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="h-full bg-zinc-900 text-white">
      <Navbar />
      <Spacer />
      <main className="container mx-auto p-4">{children}</main>
    </div>
  )
}
