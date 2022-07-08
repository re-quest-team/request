import toast from 'react-hot-toast'
import { IntlShape } from 'react-intl'

export const createToast = (promise: Promise<any>, intl: IntlShape) => {
  const msg1 = intl.formatMessage({ id: 'toasts.create.loading' })
  const msg2 = intl.formatMessage({ id: 'toasts.create.success' })
  const msg3 = intl.formatMessage({ id: 'toasts.create.error' })
  return toast.promise(promise, {
    loading: intl.formatMessage({ id: 'toasts.create.loading' }),
    success: intl.formatMessage({ id: 'toasts.create.success' }),
    error: intl.formatMessage({ id: 'toasts.create.error' }),
  })
}

export const updateToast = createToast

export const deleteToast = (promise: Promise<any>, intl: IntlShape) => {
  return toast.promise(promise, {
    loading: intl.formatMessage({ id: 'toasts.delete.loading' }),
    success: intl.formatMessage({ id: 'toasts.delete.success' }),
    error: intl.formatMessage({ id: 'toasts.delete.error' }),
  })
}

export const successToast = (intl: IntlShape) => {
  return toast.success(intl.formatMessage({ id: 'toasts.success' }))
}
export const incorrectToast = (intl: IntlShape) => {
  return toast.error(intl.formatMessage({ id: 'toasts.incorrect' }))
}
