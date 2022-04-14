import Head from 'next/head'

export type LayoutProps = {
  children: React.ReactElement
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <main className="container mx-auto p-4">{children}</main>
    </>
  )
}
