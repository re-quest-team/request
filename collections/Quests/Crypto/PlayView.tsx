import { successConfetti } from '@/components/Confetti'
import { Button } from '@/components/Elements/Button'
import { InputField } from '@/components/Elements/FormElements'
import { incorrectToast, successToast } from '@/components/Toasts'
import { useState } from 'react'
import { useQuestStore } from './store'

const PlayView = () => {
  const question = useQuestStore(state => state.question)
  const codeword = useQuestStore(state => state.codeword)
  const onSolve = useQuestStore(state => state.onSolve)
  const correct = useQuestStore(state => state.correct)

  const [answer, setAnswer] = useState('')

  return (
    <div>
      <p>{question}</p>
      <InputField
        label="Verschlüsseltes Wort"
        disabled
        value={codeword.replace(
          /[A-Z]/gi,
          c =>
            'NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm'[
              'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.indexOf(c)
            ],
        )}
      ></InputField>
      <h3 className="mt-8 text-lg">Antwort</h3>
      <InputField
        label="Codewort"
        onChange={e => setAnswer(e.target.value)}
      ></InputField>
      <Button
        onClick={() => {
          if (onSolve(answer)) {
            successToast()
            successConfetti()
          } else {
            incorrectToast()
          }
        }}
      >
        Entschlüsseln
      </Button>
    </div>
  )
}

export default PlayView
