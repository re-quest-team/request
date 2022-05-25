import toast from 'react-hot-toast'

export const createToast = (promise: Promise<any>) =>
  toast.promise(promise, {
    loading: 'Speichern',
    success: 'Speichern erfolgreich',
    error: 'Fehler beim speichern',
  })

export const updateToast = createToast

export const deleteToast = (promise: Promise<any>) =>
  toast.promise(promise, {
    loading: 'Löschen',
    success: 'Löschen erfolgreich',
    error: 'Fehler beim löschen',
  })

export const successToast = () => toast.success('Korrekt')
export const incorrectToast = () => toast.error('Falsche Antwort')
