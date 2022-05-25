import { InputField } from '@/components/Elements/FormElements'
import { useQuestStore } from './store'

const EditView = () => {
  const question = useQuestStore(state => state.question)
  const setQuestion = useQuestStore(state => state.setQuestion)

  const codeword = useQuestStore(state => state.codeword)
  const setCordeword = useQuestStore(state => state.setCordeword)

  return (
    <div>
      <InputField
        label="Aufgabenstellung"
        defaultValue={question}
        onChange={e => setQuestion(e.target.value)}
      ></InputField>
      <InputField
        label="Codewort"
        defaultValue={codeword}
        onChange={e => setCordeword(e.target.value)}
      ></InputField>
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
    </div>
  )
}

export default EditView
