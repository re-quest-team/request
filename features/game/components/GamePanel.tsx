import { Button } from '@/components/Elements/Button'
import Panel from '@/components/Panel'
import { Game } from '@prisma/client'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { useSWRConfig } from 'swr'
import { deleteGame } from '../api/deleteGame'

const GamePanel = ({ id, name, description }: Game) => {
  const { mutate } = useSWRConfig()

  const onDelete = async () => {
    const deleteGameRequest = deleteGame(id)

    toast.promise(deleteGameRequest, {
      loading: 'Löschen',
      success: 'Erfolgreich gelöscht',
      error: 'Fehler beim löschen',
    })

    await mutate(`/api/game`, (await deleteGameRequest).data, {
      populateCache: false,
      revalidate: true,
    })
  }

  return (
    <Panel type="quest" header={name || ''} onDelete={onDelete}>
      <>
        <div className="relative my-4 w-full rounded">
          <p>{description}</p>
          <Link href={`/studio/${id}`} passHref>
            <Button>Bearbeiten</Button>
          </Link>
        </div>
      </>
    </Panel>
  )
}

export default GamePanel
