import { successConfetti } from '@/components/Confetti'
import { Button } from '@/components/Elements/Button'
import { InputField } from '@/components/Elements/FormElements'
import { incorrectToast, successToast } from '@/components/Toasts'
import { useState } from 'react'
import { useQuestStore } from './store'
import { FormattedMessage, useIntl } from 'react-intl'
import { boolean } from 'yup'

const PlayView = () => {
  const question = useQuestStore(state => state.question)
  const correctAnswer = useQuestStore(state => state.correctAnswer)
  const wrongAnswers = useQuestStore(state => state.wrongAnswers)
  const onSolve = useQuestStore(state => state.onSolve)
  const correct = useQuestStore(state => state.correct)

  const allAnswers = wrongAnswers.concat(correctAnswer)
  const allAnswersShuffled = shuffle(allAnswers)
  const allAnswersLength = allAnswers.length
  var radioButtons = ''

  for (var i = 0; i < allAnswersShuffled.length; i++) {
    radioButtons +=
      '<input type="radio"value={' +
      allAnswersShuffled[i] +
      '}name={"Answer"}onChange={radioHandler}/>'
  }

  const intl = useIntl()

  const [selectedAnswer, setSelectedAnswer] = useState('')

  const radioHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAnswer(event.target.value)
  }

  function shuffle(array: string[]) {
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
      <p>{question}</p>

      <h3 className="mt-8 text-lg">Antwort</h3>
      {radioButtons}

      <Button
        onClick={() => {
          if (onSolve(selectedAnswer)) {
            successToast(intl)
            successConfetti()
          } else {
            incorrectToast(intl)
          }
        }}
      >
        <FormattedMessage id="quests.crypto.playView.decrypt" />
      </Button>
    </div>
  )
}

export default PlayView
