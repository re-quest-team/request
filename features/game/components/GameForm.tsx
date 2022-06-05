import { Button } from '@/components/Elements/Button'
import { InputField, TextArea } from '@/components/Elements/FormElements'
import Toggle from '@/components/Elements/Toggle'
import { yupResolver } from '@hookform/resolvers/yup'
import { Game } from '@prisma/client'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import useSWR from 'swr'
import * as yup from 'yup'

type GameFormProps = {
  id: string
}

const schema = yup
  .object({
    name: yup.string().required(),
    description: yup.string().required().min(8),
    draft: yup.boolean().required(),
  })
  .required()

const GameForm = ({ id }: GameFormProps) => {
  const { data, mutate, isValidating, error } = useSWR<Game, AxiosError>(
    `/api/game/${id}`,
  )
  const router = useRouter()

  if (error && error.response?.status === 404) {
    toast.error('re:quest nicht gefunden')
    router.replace('/studio')
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<yup.InferType<typeof schema>>({
    resolver: yupResolver(schema),
  })

  const onSubmit = handleSubmit(async event => {
    const postGameRequest = axios.put<Game>(`/api/game/${id}`, event, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    toast.promise(postGameRequest, {
      loading: 'Speichern',
      success: 'Erfolgreich gespeichert',
      error: 'Fehler beim Speichern',
    })
    const updatedGameRequest = await postGameRequest

    const updatedGame = updatedGameRequest.data

    await mutate(updatedGame)
  })

  return (
    <form onSubmit={onSubmit}>
      <InputField
        label="Name"
        defaultValue={data?.name ?? ''}
        registration={register('name')}
        error={errors['name']}
      ></InputField>
      <TextArea
        label="Beschreibung"
        rows={4}
        defaultValue={data?.description ?? ''}
        registration={register('description')}
        error={errors['description']}
      />
      <Toggle
        label="Entwurf"
        defaultChecked={data?.draft}
        registration={register('draft')}
        error={errors['draft']}
      />

      <Button type="submit" disabled={isValidating} isLoading={isValidating}>
        Speichern
      </Button>
    </form>
  )
}

export default GameForm
