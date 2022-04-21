import Head from 'next/head'
import { Spacer } from './Elements/Spacer'
import Navbar from './Navbar'

export type LayoutProps = {
  children: React.ReactElement
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      <Spacer />
      <main className="container mx-auto p-4">{children}</main>
    </>
  )
}
