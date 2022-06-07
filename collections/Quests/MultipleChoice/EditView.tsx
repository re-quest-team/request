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

  var wrongAnswerInputs = ''
  var answerAmount = wrongAnswers.length

  for (answerAmount = wrongAnswers.length; (answerAmount = 0); answerAmount--) {
    if (
      (wrongAnswers[answerAmount] = '' && wrongAnswers[answerAmount - 1] != '')
    ) {
      break
    }
  }

  for (var i = 0; i < answerAmount; i++) {
    wrongAnswerInputs +=
      '<InputField label="falsche Antwort" defaultValue={' +
      wrongAnswers[i] +
      '}onChange={e => replaceAnswer(e, ' +
      i +
      ')} ></InputField>'
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
      {wrongAnswerInputs}
    </div>
  )
}

export default EditView
