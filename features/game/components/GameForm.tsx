'use client'

import { SubtleInputField } from '@/components/Elements/FormElements'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { useIntl } from 'react-intl'
import { Fragment, useState } from 'react'
import { Save } from 'react-feather'
import useGame from '../api/useGame'
import { Transition } from '@headlessui/react'
import { TrashIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'
import Modal from '@/components/Modal'
import { Button } from '@/components/Elements/Button'

type GameFormProps = {
  gameId: string
}

const schema = yup
  .object({
    name: yup.string().required().min(1),
    description: yup.string().required().min(8),
    language: yup.boolean().required(),
    public: yup.boolean().required(),
  })
  .required()

const GameForm = ({ gameId }: GameFormProps) => {
  const intl = useIntl()

  const { game, updateGame, deleteGame } = useGame(gameId)

  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const {
    register,
    getValues,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<yup.InferType<typeof schema>>({
    resolver: yupResolver(schema),
  })

  const onSubmit = () => {
    updateGame({
      name: getValues().name,
    })
  }

  const router = useRouter()

  return (
    <>
      <form onSubmit={onSubmit} className="flex items-center space-x-4">
        <SubtleInputField
          className="w-96 text-xl"
          defaultValue={game?.name ?? ''}
          registration={register('name')}
          error={errors['name']}
        ></SubtleInputField>
        <Transition appear show={watch().name !== game?.name}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div onClick={onSubmit}>
              <Save />
            </div>
          </Transition.Child>
        </Transition>
        <div
          onClick={() => {
            setShowDeleteModal(true)
          }}
        >
          <TrashIcon className="h-5 w-5 text-red-400" />
        </div>
        {/* <TextArea
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
            defaultChecked={data?.language === 'DE'}
            registration={register('language')}
            error={errors['language']}
          />
          <Toggle
            label={intl.formatMessage({
              id: 'features.game.gameForm.labelPublic',
            })}
            defaultChecked={data?.public}
            registration={register('public')}
            error={errors['public']}
          />
          <Button
            type="submit"
            size="sm"
            disabled={isValidating}
            isLoading={isValidating}
          >
            <FormattedMessage id="features.game.gameForm.submit" />
          </Button> */}
      </form>
      <Modal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="re:quest löschen"
      >
        <div>
          <p>Wollen Sie das re:quest wirklich löschen?</p>
          <div className="flex space-x-4">
            <Button
              variant="danger"
              onClick={() => {
                deleteGame()
                router.replace('/studio')
              }}
            >
              Ja
            </Button>
            <Button onClick={() => setShowDeleteModal(false)}>Nein</Button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default GameForm
