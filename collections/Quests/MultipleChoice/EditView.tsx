import { Button, PillButton } from '@/components/Elements/Button'
import { InputField } from '@/components/Elements/FormElements'
import { FormattedMessage, useIntl } from 'react-intl'
import { useQuestStore } from './store'
import { MinusCircleIcon, PlusCircleIcon } from '@heroicons/react/outline'

const EditView = () => {
  const question = useQuestStore(state => state.question)
  const setQuestion = useQuestStore(state => state.setQuestion)

  const rightAnswers = useQuestStore(state => state.rightAnswers)
  const setRightAnswers = useQuestStore(state => state.setRightAnswers)

  const correctAnswers = useQuestStore(state => state.correctAnswers)
  const setCorrectAnswers = useQuestStore(state => state.setCorrectAnswers)

  const wrongAnswers = useQuestStore(state => state.wrongAnswers)
  const setWrongAnswers = useQuestStore(state => state.setWrongAnswers)

  const setShuffledAnswers = useQuestStore(state => state.setShuffledAnswers)

  const intl = useIntl()

  const label1 = intl.formatMessage({
    id: 'quests.multipleChoice.editView.labelTask',
  })
  const label2 = intl.formatMessage({
    id: 'quests.multipleChoice.editView.labelCorrectAnswer',
  })
  const label3 = intl.formatMessage({
    id: 'quests.multipleChoice.editView.labelWrongAnswer',
  })

  const replaceWrongAnswer = (
    event: React.ChangeEvent<HTMLInputElement>,
    i: number,
  ) => {
    let answers = wrongAnswers

    answers[i - 1] = { key: i, name: event.target.value }

    setWrongAnswers(answers)

    const pureAnswers = wrongAnswers.filter(
      (item: { key: number; name: string }) => item.name !== '',
    )

    const allAnswers = pureAnswers.concat(correctAnswers)
    setShuffledAnswers(shuffle(allAnswers))
  }

  const replaceCorrectAnswer = (
    event: React.ChangeEvent<HTMLInputElement>,
    i: number,
  ) => {
    let answers = correctAnswers

    answers[i * -1 - 1] = { key: i, name: event.target.value }

    let rightAnswersCreator = ['']
    rightAnswersCreator.pop()

    answers.forEach(e => rightAnswersCreator.push(e.name))
    rightAnswersCreator.sort()

    setRightAnswers(rightAnswersCreator)
    console.log(rightAnswers)

    setCorrectAnswers(answers)

    const pureAnswers = correctAnswers.filter(
      (item: { key: number; name: string }) => item.name !== '',
    )

    const allAnswers = pureAnswers.concat(wrongAnswers)
    setShuffledAnswers(shuffle(allAnswers))
  }

  function shuffle(array: { key: number; name: string }[]) {
    let currentIndex = array.length,
      randomIndex

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--

      // And swap it with the current element.
      ;[array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ]
    }
    return array
  }

  return (
    <div>
      <InputField
        label={intl.formatMessage({
          id: 'quests.multipleChoice.editView.labelTask',
        })}
        defaultValue={question}
        onChange={e => setQuestion(e.target.value)}
      />
      {correctAnswers.map(val => (
        <InputField
          key={val.key}
          label={label2}
          defaultValue={val.name}
          onChange={e => replaceCorrectAnswer(e, val.key)}
        />
      ))}
      <div id="refWrong" />
      <div className="my-4 flex">
        <PillButton
          className=" my-3 mx-auto  h-10 w-10 content-center"
          variant="tertiary"
          onClick={() =>
            setCorrectAnswers(
              correctAnswers.concat({
                key: (correctAnswers.length + 1) * -1,
                name: '',
              }),
            )
          }
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

      {wrongAnswers.map(val => (
        <InputField
          key={val.key}
          label={intl.formatMessage({
            id: 'quests.multipleChoice.editView.labelWrongAnswer',
          })}
          defaultValue={val.name}
          onChange={e => replaceWrongAnswer(e, val.key)}
        />
      ))}
      <div className="my-4 flex">
        <PillButton
          className=" my-3 mx-auto  h-10 w-10 content-center"
          variant="tertiary"
          onClick={() =>
            setWrongAnswers(
              wrongAnswers.concat({ key: wrongAnswers.length + 1, name: '' }),
            )
          }
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
