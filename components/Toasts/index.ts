import { useIntlStore } from '@/stores/intl'
import toast from 'react-hot-toast'

export const createToast = (promise: Promise<any>) => {
  const intl = useIntlStore.getState().intl!
  return toast.promise(promise, {
    loading: intl.formatMessage({ id: 'toasts.create.loading' }),
    success: intl.formatMessage({ id: 'toasts.create.success' }),
    error: intl.formatMessage({ id: 'toasts.create.error' }),
  })
}

export const updateToast = createToast

export const deleteToast = (promise: Promise<any>) => {
  const intl = useIntlStore.getState().intl!
  return toast.promise(promise, {
    loading: intl.formatMessage({ id: 'toasts.delete.loading' }),
    success: intl.formatMessage({ id: 'toasts.delete.success' }),
    error: intl.formatMessage({ id: 'toasts.delete.error' }),
  })
}

export const successToast = () => {
  const intl = useIntlStore.getState().intl!
  return toast.success(intl.formatMessage({ id: 'toasts.success' }))
}
export const incorrectToast = () => {
  const intl = useIntlStore.getState().intl!
  return toast.error(intl.formatMessage({ id: 'toasts.incorrect' }))
}
