import React from 'react'
import { Spacer } from './Elements/Spacer'
import Navbar from './Navbar'

export default function NonPlayLayout({
  children,
}: {
  children: React.ReactElement
}) {
  return (
    <>
      <Navbar />
      <Spacer />
      <main className="container mx-auto p-4">{children}</main>
    </>
  )
}
