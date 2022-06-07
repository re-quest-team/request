import { successConfetti } from '@/components/Confetti'
import { Button } from '@/components/Elements/Button'
import { InputField } from '@/components/Elements/FormElements'
import { incorrectToast, successToast } from '@/components/Toasts'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useQuestStore } from './store'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { valNumberInput } from '@/collections/Quests/NumberInput/validation'
import { useIntl } from 'react-intl'

const PlayView = () => {
  const question = useQuestStore(state => state.question)
  const result = useQuestStore(state => state.answer)
  const unit = useQuestStore(state => state.unit)
  const onSolve = useQuestStore(state => state.onSolve)
  const correct = useQuestStore(state => state.correct)

  const intl = useIntl()

  const [answer, setAnswer] = useState('')
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(valNumberInput),
    mode: 'all',
    criteriaMode: 'all',
  })
  const { errors } = formState

  const answerCheck = async (data: any) => {
    if (await valNumberInput.validate(data)) {
      checkCorrect()
    }
  }

  const checkCorrect = async () => {
    if (!errors.answer) {
      if (onSolve(Number(answer))) {
        successToast(intl)
        successConfetti()
      } else {
        incorrectToast(intl)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(answerCheck)}>
      <p>{question}</p>
      <InputField
        label="Antwort"
        name={'answer'}
        className={'form-control'}
        registration={register('answer')}
        error={errors.answer}
        unit={unit}
        onChange={e => setAnswer(e.target.value)}
      ></InputField>
      <Button type="submit" onClick={checkCorrect}>
        Überprüfen
      </Button>
    </form>
  )
}

export default PlayView
