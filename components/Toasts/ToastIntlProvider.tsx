import { useIntlStore } from '@/stores/intl'
import { useEffect } from 'react'
import { useIntl } from 'react-intl'

/**
 *
 * @description This Provider just passes the intl object to the store which will be consumed by the toasts
 */
const ToastIntlProidver = () => {
  const intl = useIntl()

  const { setIntl } = useIntlStore()

  useEffect(() => {
    setIntl(intl)
  }, [intl, setIntl])

  return <></>
}

export default ToastIntlProidver
