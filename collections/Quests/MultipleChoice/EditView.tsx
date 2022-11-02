import { Button, PillButton } from '@/components/Elements/Button'
import { InputField } from '@/components/Elements/FormElements'
import { FormattedMessage, useIntl } from 'react-intl'
import { useQuestStore } from './store'
import { MinusCircleIcon, PlusCircleIcon } from '@heroicons/react/24/outline'
import randomize from '@/utils/randomize'

const EditView = () => {
  const question = useQuestStore(state => state.question)
  const setQuestion = useQuestStore(state => state.setQuestion)

  const correctAnswers = useQuestStore(state => state.correctAnswers)
  const setCorrectAnswers = useQuestStore(state => state.setCorrectAnswers)

  const wrongAnswers = useQuestStore(state => state.wrongAnswers)
  const setWrongAnswers = useQuestStore(state => state.setWrongAnswers)

  const setShuffledAnswers = useQuestStore(state => state.setShuffledAnswers)

  const intl = useIntl()

  const replaceWrongAnswer = (
    event: React.ChangeEvent<HTMLInputElement>,
    i: number,
  ) => {
    let answers = wrongAnswers

    answers[i] = event.target.value
    setWrongAnswers(answers)
    shuffle()
  }

  const replaceCorrectAnswer = (
    event: React.ChangeEvent<HTMLInputElement>,
    i: number,
  ) => {
    let answers = correctAnswers

    answers[i] = event.target.value
    setCorrectAnswers(answers.sort())
    shuffle()
  }

  const shuffle = () => {
    const allAnswers = randomize(correctAnswers.concat(wrongAnswers))
    setShuffledAnswers(allAnswers.filter(item => item !== ''))
  }

  return (
    <div>
      <InputField
        label={intl.formatMessage({
          id: 'editView.labelTask',
        })}
        defaultValue={question}
        onChange={e => setQuestion(e.target.value)}
      />
      {correctAnswers.map((val, index) => (
        <InputField
          key={index}
          label={intl.formatMessage({
            id: 'editView.labelCorrectAnswer',
          })}
          defaultValue={val}
          onChange={e => replaceCorrectAnswer(e, index)}
        />
      ))}
      <div id="refWrong" />
      <div className="my-4 flex">
        <PillButton
          className=" my-3 mx-auto  h-10 w-10 content-center"
          variant="tertiary"
          onClick={() => setCorrectAnswers(correctAnswers.concat(''))}
        >
          <PlusCircleIcon className="m-2 h-5 w-5 " />
        </PillButton>
        <PillButton
          className="hover:fley-row-reverse reverse my-3 mx-auto h-10 w-10 content-center"
          variant="secondary"
          onClick={() =>
            setCorrectAnswers(
              correctAnswers.slice(0, correctAnswers.length - 1),
            )
          }
        >
          <MinusCircleIcon className="m-2 h-5 w-5 " />
        </PillButton>
      </div>

      {wrongAnswers.map((val, index) => (
        <InputField
          key={index}
          label={intl.formatMessage({
            id: 'editView.labelWrongAnswer',
          })}
          defaultValue={val}
          onChange={e => replaceWrongAnswer(e, index)}
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
          className="hover:fley-row-reverse reverse my-3 mx-auto h-10 w-10 content-center"
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
