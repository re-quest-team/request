import { Dialog, Transition } from '@headlessui/react'
import { ArrowLeftIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import { Fragment, useState } from 'react'

const backdropVariant = {
  normal: 'bg-opacity-80',
  hidden: 'bg-opacity-0',
}

type ModalProps = {
  open: boolean
  onClose: () => void
  title: string
  children: React.ReactElement
  showBack?: boolean
  onBack?: () => void
  backdrop?: keyof typeof backdropVariant
}

const Modal = ({
  open,
  title,
  children,
  onClose,
  showBack,
  onBack,
  backdrop = 'normal',
}: ModalProps) => {
  return (
    <Transition show={open} as={Fragment}>
      <Dialog className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className={clsx(
              'fixed inset-0 bg-black',
              backdropVariant[backdrop],
            )}
          />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-zinc-900 p-6 text-left align-middle text-white shadow-xl transition-all">
                <div className="flex">
                  {showBack && (
                    <ArrowLeftIcon
                      className="h-6 w-6 cursor-pointer"
                      onClick={onBack}
                    />
                  )}
                  <Dialog.Title
                    as="h4"
                    className="mb-6 flex-1 text-center text-xl font-semibold"
                  >
                    {title}
                  </Dialog.Title>
                </div>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default Modal
