'use client'

import { Button } from '@/components/Elements/Button'
import {
  InputField,
  SubtleInputField,
  TextArea,
} from '@/components/Elements/FormElements'
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
import { Fragment, memo, useMemo, useState } from 'react'
import { Save } from 'react-feather'
import useGame from '../api/useGame'
import { Transition } from '@headlessui/react'

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

  const { game, updateGame } = useGame(gameId)

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
    updateGame(gameId, {
      name: getValues().name,
    })
  }

  return (
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
          <div onClick={handleSubmit(onSubmit)}>
            <Save />
          </div>
        </Transition.Child>
      </Transition>
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
  )
}

export default GameForm
