import { successConfetti } from '@/components/Confetti'
import { Button } from '@/components/Elements/Button'
import { InputField } from '@/components/Elements/FormElements'
import { incorrectToast, successToast } from '@/components/Toasts'
import { useState } from 'react'
import { useQuestStore } from './store'
import { FormattedMessage, useIntl } from 'react-intl'

const PlayView = () => {
  const question = useQuestStore(state => state.question)
  const codeword = useQuestStore(state => state.codeword)
  const onSolve = useQuestStore(state => state.onSolve)
  const correct = useQuestStore(state => state.correct)

  const [answer, setAnswer] = useState('')

  const intl = useIntl()
  const encryptWord = intl.formatMessage({
    id: 'quests.crypto.playView.encryptedWord',
  })
  const codeWord = intl.formatMessage({ id: 'quests.crypto.playView.codeWord' })

  return (
    <div>
      <p>{question}</p>
      <InputField
        label={encryptWord}
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
        label={codeWord}
        onChange={e => setAnswer(e.target.value)}
      ></InputField>
      <Button
        onClick={() => {
          if (onSolve(answer)) {
            successToast(intl)
            successConfetti()
          } else {
            incorrectToast(intl)
          }
        }}
      >
        <FormattedMessage id="quests.crypto.playView.decrypt" />
      </Button>
    </div>
  )
}

export default PlayView
