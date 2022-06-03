import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  number: Yup.number().notOneOf(
    [NaN],
    'Eingabe muss einer Nummer entsprechen!',
  ),
})
export const formOptions = { resolver: yupResolver(validationSchema) }
