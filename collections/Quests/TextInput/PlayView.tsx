import { successConfetti } from '@/components/Confetti'
import { Button } from '@/components/Elements/Button'
import { InputField } from '@/components/Elements/FormElements'
import { incorrectToast, successToast } from '@/components/Toasts'
import { useState } from 'react'
import { useQuestStore } from './store'

const PlayView = () => {
  const question = useQuestStore(state => state.question)
  const answer = useQuestStore(state => state.answer)
  const onSolve = useQuestStore(state => state.onSolve)
  const correct = useQuestStore(state => state.correct)

  const [answer, setAnswer] = useState('')

  return (
    <div>
      <p>{question}</p>
      <InputField
       label="Antwort"
       name={'answer'}
       onChange={e => setAnswer(e.target.value)}
      ></InputField>
      <Button type='submit'
        onClick={() => {
          if (onSolve(answer)) {
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
