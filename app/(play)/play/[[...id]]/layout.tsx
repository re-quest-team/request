export default async function Layout({
  params,
  children,
}: {
  params: { id: string[] }
  children: React.ReactNode
}) {
  const [gameId, roomId] = params.id

  return (
    <div className="relative">
      {/* <div className="absolute z-10 m-4 rounded-xl bg-zinc-900 p-4 text-white">
          <Button onClick={() => setIndex(index + 1)}>Nächster Raum</Button>
        </div> */}
      {children}
    </div>
  )
}
