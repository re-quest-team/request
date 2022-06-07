import toast from 'react-hot-toast'
import { IntlShape } from 'react-intl'

export const createToast = (promise: Promise<any>, intl: IntlShape) => {
  const msg1 = intl.formatMessage({ id: 'toasts.create.loading' })
  const msg2 = intl.formatMessage({ id: 'toasts.create.success' })
  const msg3 = intl.formatMessage({ id: 'toasts.create.error' })
  return toast.promise(promise, {
    loading: msg1,
    success: msg2,
    error: msg3,
  })
}

export const updateToast = createToast

export const deleteToast = (promise: Promise<any>, intl: IntlShape) => {
  const msg1 = intl.formatMessage({ id: 'toasts.delete.loading' })
  const msg2 = intl.formatMessage({ id: 'toasts.delete.success' })
  const msg3 = intl.formatMessage({ id: 'toasts.delete.error' })
  return toast.promise(promise, {
    loading: msg1,
    success: msg2,
    error: msg3,
  })
}

export const successToast = (intl: IntlShape) => {
  const msg = intl.formatMessage({ id: 'toasts.success' })
  return toast.success(msg)
}
export const incorrectToast = (intl: IntlShape) => {
  const msg = intl.formatMessage({ id: 'toasts.incorrect' })
  return toast.error(msg)
}
