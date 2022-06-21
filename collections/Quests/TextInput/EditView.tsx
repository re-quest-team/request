import { InputField } from '@/components/Elements/FormElements'
import { useQuestStore } from './store'
import { FormattedMessage, useIntl } from 'react-intl'

const EditView = () => {

  const question = useQuestStore(state => state.question)
  const setQuestion = useQuestStore(state => state.setQuestion)

  const answer = useQuestStore(state => state.Answer)
  const setAnswer = useQuestStore(state => state.setAnswer)

  const intl = useIntl()

  const label1 = intl.formatMessage({
    id: 'quest.textInput.editView.labelTask',
  })

  const label2 = intl.formatMessage({
    id: 'quest.textInput.editView.labelAnswerTask',
  })

  return (
    <div>
      <InputField
        label={label1}
        defaultValue={question}
        onChange={e => setQuestion(e.target.value)}
      ></InputField>
      <InputField
        label={label2}
        defaultValue={answer}
        onChange={e => setAnswer(e.target.value)}
      ></InputField>
    </div>
  )
}

export default EditView
