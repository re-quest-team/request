import React from 'react'
import { Spacer } from '@/components/Elements/Spacer'
import Navbar from '@/components/Navbar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <Spacer />
      <main className="container mx-auto p-4">{children}</main>
    </>
  )
}
