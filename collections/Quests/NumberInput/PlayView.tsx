import { successConfetti } from '@/components/Confetti'
import { Button } from '@/components/Elements/Button'
import { InputField } from '@/components/Elements/FormElements'
import { incorrectToast, successToast } from '@/components/Toasts'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useQuestStore } from './store'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { valNumberInput } from '@/collections/Quests/NumberInput/validation'

const PlayView = () => {
  const question = useQuestStore(state => state.question)
  const result = useQuestStore(state => state.answer)
  const unit = useQuestStore(state => state.unit)
  const onSolve = useQuestStore(state => state.onSolve)
  const correct = useQuestStore(state => state.correct)

  const [answer, setAnswer] = useState('')
  const formOptions = {
    resolver: yupResolver(valNumberInput),
    mode: 'all',
    criteriaMode: 'all',
  }
  // @ts-ignore
  const { register, handleSubmit, formState } = useForm(formOptions)
  const { errors } = formState

  let check = false

  const answerSend = (data: any) => {
    console.log('in answer send')
    if (errors.answer === {}) {
      check = true
      checkCorrect()
    } else {
      check = false
    }
  }

  const checkCorrect = () => {
    if (onSolve(Number(answer))) {
      console.log('valid')
      successToast()
      successConfetti()
    } else if (check) {
      incorrectToast()
    }
  }

  return (
    <form onSubmit={handleSubmit(answerSend)}>
      <p>{question}</p>
      <InputField
        label="Antwort"
        name={'answer'}
        registration={register('answer')}
        error={errors.answer}
        onChange={e => setAnswer(e.target.value)}
      ></InputField>
      <Button type="submit" onClick={checkCorrect}>
        Überprüfen
      </Button>
    </form>
  )
}

export default PlayView
