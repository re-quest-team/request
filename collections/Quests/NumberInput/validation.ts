import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

export const valNumberInput = Yup.object().shape({
  question: Yup.string().required('Frage muss gestellt werden!'),
  answer: Yup.number()
    .typeError('NaN ungültig')
    .required('Antwort muss angegeben werden!'),
  type: Yup.string()
    .oneOf([
      'm',
      'mm',
      'cm',
      'dm',
      'km',
      'qm',
      'a',
      'ha',
      'qkm',
      'm³',
      'l',
      'ml',
      'cl',
      'dl',
      'hl',
      'rad',
      '°',
      's',
      'min',
      'h',
      'd',
    ])
    .notRequired(),
})
export const formOptions = { resolver: yupResolver(valNumberInput) }
