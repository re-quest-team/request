import { InputField } from '@/components/Elements/FormElements'
import { useQuestStore } from './store'

const EditView = () => {

  const question = useQuestStore(state => state.question)
  const setQuestion = useQuestStore(state => state.setQuestion)

  const answer = useQuestStore(state => state.Answer)
  const setAnswer = useQuestStore(state => state.setAnswer)

  return (
    <div>
      <InputField
        label="Fragestellung"
        defaultValue={question}
        onChange={e => setQuestion(e.target.value)}
      ></InputField>
      <InputField
        label="Antwort"
        defaultValue={answer}
        onChange={e => setAnswer(e.target.value)}
      ></InputField>
    </div>
  )
}

export default EditView
