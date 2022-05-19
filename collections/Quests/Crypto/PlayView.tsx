import { InputField } from '@/components/Elements/FormElements'
import { useState } from 'react'
import { useQuestionStore } from './store'

const PlayView = () => {
  const [encrypted, setEncrypted] = useState('')
  const question = useQuestionStore(state => state.question)

  return (
    <div>
      <p>{question}</p>
      <InputField
        label="Codewort"
        onChange={e => setEncrypted(e.target.value)}
      ></InputField>
      <InputField
        label="Verschlüsseltes Wort"
        disabled
        value={encrypted.replace(
          /[A-Z]/gi,
          c =>
            'NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm'[
              'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.indexOf(c)
            ],
        )}
      ></InputField>
    </div>
  )
}

export default PlayView
