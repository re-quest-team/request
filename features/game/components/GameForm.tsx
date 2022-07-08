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
import { FormattedMessage, useIntl } from 'react-intl'
import { createToast } from '@/components/Toasts'

type GameFormProps = {
  id: string
}

const schema = yup
  .object({
    name: yup.string().required(),
    description: yup.string().required().min(8),
    germanLanguage: yup.boolean().required(),
    draft: yup.boolean().required(),
  })
  .required()

const GameForm = ({ id }: GameFormProps) => {
  const intl = useIntl()

  const { data, mutate, isValidating, error } = useSWR<Game, AxiosError>(
    `/api/game/${id}`,
  )
  const router = useRouter()

  if (error && error.response?.status === 404) {
    toast.error(
      intl.formatMessage({ id: 'features.game.gameForm.toastNotFound' }),
    )
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

    createToast(postGameRequest, intl)

    const updatedGameRequest = await postGameRequest

    const updatedGame = updatedGameRequest.data

    await mutate(updatedGame)
  })

  return (
    <form onSubmit={onSubmit}>
      <InputField
        label={intl.formatMessage({ id: 'features.game.gameForm.labelName' })}
        defaultValue={data?.name ?? ''}
        registration={register('name')}
        error={errors['name']}
      ></InputField>
      <TextArea
        label={intl.formatMessage({
          id: 'features.game.gameForm.labelDescription',
        })}
        rows={4}
        defaultValue={data?.description ?? ''}
        registration={register('description')}
        error={errors['description']}
      />
      <Toggle
        label={intl.formatMessage({ id: 'languages.german' })}
        defaultChecked={data?.germanLanguage}
        registration={register('germanLanguage')}
        error={errors['germanLanguage']}
      />
      <Toggle
        label={intl.formatMessage({ id: 'features.game.gameForm.labelDraft' })}
        defaultChecked={data?.draft}
        registration={register('draft')}
        error={errors['draft']}
      />

      <Button type="submit" disabled={isValidating} isLoading={isValidating}>
        <FormattedMessage id="features.game.gameForm.submit" />
      </Button>
    </form>
  )
}

export default GameForm
