type QrPdfTemplateProps = {
  name: string | null
  description: string | null
  onQrLoad: (e: HTMLDivElement | null) => void
}

export default function PdfTemplate({
  name,
  description,
  onQrLoad,
}: QrPdfTemplateProps) {
  return (
    <>
      <div className="w-full py-20" />
      <div className="mx-auto w-96 rounded bg-gradient-to-br from-flamingo-400 to-purple-400 pb-3">
        <h1 className="px-3 py-4 text-center align-middle text-2xl">{name}</h1>
        <div
          ref={onQrLoad}
          className="mx-8 mt-3 flex flex-row justify-center rounded bg-white p-4"
        />
        <p className="px-3 py-4 text-center align-middle">{description}</p>
      </div>
    </>
  )
}
