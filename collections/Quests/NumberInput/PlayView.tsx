import { successConfetti } from '@/components/Confetti'
import { Button } from '@/components/Elements/Button'
import { InputField } from '@/components/Elements/FormElements'
import { incorrectToast, successToast } from '@/components/Toasts'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useQuestStore } from './store'
import {
  formOptions,
  valNumberInput,
} from '@/collections/Quests/NumberInput/validation'

const PlayView = () => {
  const question = useQuestStore(state => state.question)
  const result = useQuestStore(state => state.answer)
  const onSolve = useQuestStore(state => state.onSolve)
  const correct = useQuestStore(state => state.correct)

  const [answer, setAnswer] = useState('')
  const { register, handleSubmit, reset, formState } = useForm(formOptions)
  const { errors } = formState

  return (
    <div>
      <p>{question}</p>
      <InputField
        label="Antwort"
        name={'answer'}
        registration={register('answer')}
        error={errors.answer}
        onChange={e => setAnswer(e.target.value)}
      ></InputField>
      <Button
        onClick={() => {
          if (onSolve(Number(answer))) {
            successToast()
            successConfetti()
          } else {
            incorrectToast()
          }
        }}
      >
        Überprüfen
      </Button>
    </div>
  )
}

export default PlayView
