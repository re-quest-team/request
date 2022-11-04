import NonPlayLayout from '@/components/NonPlayLayout'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <NonPlayLayout>
      <>{children}</>
    </NonPlayLayout>
  )
}
