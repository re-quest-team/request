import { InputField } from '@/components/Elements/FormElements'
import { string } from 'yup/lib/locale'
import { useQuestStore } from './store'

const EditView = () => {
  const question = useQuestStore(state => state.question)
  const setQuestion = useQuestStore(state => state.setQuestion)

  const correctAnswer = useQuestStore(state => state.correctAnswer)
  const setCorrectAnswer = useQuestStore(state => state.setCorrectAnswer)

  const wrongAnswers = useQuestStore(state => state.wrongAnswers)
  const setWrongAnswers = useQuestStore(state => state.setWrongAnswers)

  const replaceAnswer = (
    event: React.ChangeEvent<HTMLInputElement>,
    i: number,
  ) => {
    var Answers = wrongAnswers
    Answers[i] = event.target.value
    setWrongAnswers(Answers)
  }

  return (
    <div>
      <InputField
        label="Aufgabenstellung"
        defaultValue={question}
        onChange={e => setQuestion(e.target.value)}
      ></InputField>
      <InputField
        label="richtige Antwort"
        defaultValue={correctAnswer}
        onChange={e => setCorrectAnswer(e.target.value)}
      ></InputField>
      <InputField
        label="richtige Antwort"
        defaultValue={wrongAnswers[1]}
        onChange={e => replaceAnswer(e, 1)}
      ></InputField>
      <InputField
        label="richtige Antwort"
        defaultValue={wrongAnswers[2]}
        onChange={e => replaceAnswer(e, 2)}
      ></InputField>
      <InputField
        label="richtige Antwort"
        defaultValue={wrongAnswers[3]}
        onChange={e => replaceAnswer(e, 3)}
      ></InputField>
      <InputField
        label="richtige Antwort"
        defaultValue={wrongAnswers[4]}
        onChange={e => replaceAnswer(e, 4)}
      ></InputField>
      <InputField
        label="richtige Antwort"
        defaultValue={wrongAnswers[5]}
        onChange={e => replaceAnswer(e, 5)}
      ></InputField>
      <InputField
        label="richtige Antwort"
        defaultValue={wrongAnswers[6]}
        onChange={e => replaceAnswer(e, 6)}
      ></InputField>
      <InputField
        label="richtige Antwort"
        defaultValue={wrongAnswers[7]}
        onChange={e => replaceAnswer(e, 7)}
      ></InputField>
    </div>
  )
}

export default EditView
