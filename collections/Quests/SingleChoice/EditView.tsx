import { Button, PillButton } from '@/components/Elements/Button'
import { InputField } from '@/components/Elements/FormElements'
import { FormattedMessage, useIntl } from 'react-intl'
import { useQuestStore } from './store'
import { MinusCircleIcon, PlusCircleIcon } from '@heroicons/react/outline'
import randomize from '@/utils/randomize'

const EditView = () => {
  const question = useQuestStore(state => state.question)
  const setQuestion = useQuestStore(state => state.setQuestion)

  const correctAnswer = useQuestStore(state => state.correctAnswer)
  const setCorrectAnswer = useQuestStore(state => state.setCorrectAnswer)

  const wrongAnswers = useQuestStore(state => state.wrongAnswers)
  const setWrongAnswers = useQuestStore(state => state.setWrongAnswers)

  const setShuffledAnswers = useQuestStore(state => state.setShuffledAnswers)

  const intl = useIntl()

  const replaceAnswer = (
    event: React.ChangeEvent<HTMLInputElement>,
    i: number,
  ) => {
    let answers = wrongAnswers

    answers[i] = event.target.value

    setWrongAnswers(answers)

    const pureAnswers = wrongAnswers.filter(item => item !== '')

    const allAnswers = pureAnswers.concat(correctAnswer)
    setShuffledAnswers(randomize(allAnswers))
  }

  return (
    <div>
      <InputField
        label={intl.formatMessage({
          id: 'quests.singleChoice.editView.labelTask',
        })}
        defaultValue={question}
        onChange={e => setQuestion(e.target.value)}
      />
      <InputField
        label={intl.formatMessage({
          id: 'quests.singleChoice.editView.labelCorrectAnswer',
        })}
        defaultValue={correctAnswer}
        onChange={e => setCorrectAnswer(e.target.value)}
      />
      <div id="refWrong" />

      {wrongAnswers.map((val, index) => (
        <InputField
          key={index}
          label={intl.formatMessage({
            id: 'quests.singleChoice.editView.labelWrongAnswer',
          })}
          defaultValue={val}
          onChange={e => replaceAnswer(e, index)}
        />
      ))}
      <div className="my-4 flex">
        <PillButton
          className=" my-3 mx-auto  h-10 w-10 content-center"
          variant="tertiary"
          onClick={() => setWrongAnswers(wrongAnswers.concat(''))}
        >
          <PlusCircleIcon className="m-2 h-5 w-5 " />
        </PillButton>
        <PillButton
          className="reverse my-3 mx-auto h-10 w-10 content-center hover:flex-row-reverse"
          variant="secondary"
          onClick={() =>
            setWrongAnswers(wrongAnswers.slice(0, wrongAnswers.length - 1))
          }
        >
          <MinusCircleIcon className="m-2 h-5 w-5 " />
        </PillButton>
      </div>
    </div>
  )
}

export default EditView
