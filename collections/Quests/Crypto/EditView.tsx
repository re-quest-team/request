import { InputField } from '@/components/Elements/FormElements'
import { useState } from 'react'
import { useQuestionStore } from './store'

const EditView = () => {
  const [encrypted, setEncrypted] = useState('')
  const question = useQuestionStore(state => state.question)
  const setQuestion = useQuestionStore(state => state.setQuestion)

  return (
    <div>
      <InputField
        label="Aufgabenstellung"
        defaultValue={question}
        onChange={e => setQuestion(e.target.value)}
      ></InputField>
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

export default EditView
