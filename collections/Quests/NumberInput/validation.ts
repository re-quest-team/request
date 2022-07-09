import * as Yup from 'yup'
import { Units } from '@/collections/Quests/NumberInput/units'
import { IntlShape } from 'react-intl'

export const valNumberInput = (intl: IntlShape) =>
  Yup.object()
    .shape({
      question: Yup.string().required(
        intl.formatMessage({
          id: 'validation.questionRequired',
        }),
      ),
      answer: Yup.number()
        .typeError(
          intl.formatMessage({
            id: 'validation.nanInvalid',
          }),
        )
        .required(
          intl.formatMessage({
            id: 'validation.answerRequired',
          }),
        ),
      type: Yup.string().oneOf(Object.values(Units)).notRequired(),
    })
    .required()
