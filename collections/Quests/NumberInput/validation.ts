import * as Yup from 'yup'
import { Units } from '@/collections/Quests/NumberInput/units'

export const valNumberInput = Yup.object()
  .shape({
    question: Yup.string().required('Frage muss gestellt werden!'),
    answer: Yup.number()
      .typeError('NaN ungültig')
      .required('Antwort muss angegeben werden!'),
    type: Yup.string().oneOf(Object.values(Units)).notRequired(),
  })
  .required()
