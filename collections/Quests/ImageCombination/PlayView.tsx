import { successConfetti } from '@/components/Confetti'
import { Button } from '@/components/Elements/Button'
import { incorrectToast, successToast } from '@/components/Toasts'
import React from 'react'
import { useQuestStore } from './store'
import { FormattedMessage, useIntl } from 'react-intl'
import Image from 'next/image'

const PlayView = () => {
  const intl = useIntl()
  const toBeCombined = intl.formatMessage({
    id: 'quests.imageCombination.playView.imageToBeCombined',
  })
  const chose = intl.formatMessage({
    id: 'quests.imageCombination.playView.chose',
  })

  const task = useQuestStore(state => state.task)
  const imageToBeCombined = useQuestStore(state => state.imageToBeCombined)
  const correctAnswers = useQuestStore(state => state.correctAnswers)
  const imagesToCombineRandomOrder = useQuestStore(
    state => state.imagesToCombineRandomOrder,
  )
  const onSolve = useQuestStore(state => state.onSolve)

  const answersGiven = new Map()
  for (let i = 0; i < imagesToCombineRandomOrder.length; i++) {
    answersGiven.set(i, false)
  }

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    let i = Number(event.target.id)
    if (event.target.checked) {
      answersGiven.set(i, true)
    } else {
      answersGiven.set(i, false)
    }
  }

  function checkCorrect() {
    if (onSolve(answersGiven, correctAnswers, imagesToCombineRandomOrder)) {
      successToast(intl)
      successConfetti()
    } else {
      incorrectToast(intl)
    }
  }

  return (
    <div>
      <p>{task}</p>
      <p>{toBeCombined}</p>
      <Image src={imageToBeCombined} alt="Image to be combined" />
      <p>{chose}</p>
      <ul>
        {imagesToCombineRandomOrder.map((test, index) => {
          return (
            <li key={index}>
              <Image src={test} alt="Image to combine" />
              <input
                value={test}
                type="checkbox"
                id={index.toString()}
                onChange={handleCheck}
              />
            </li>
          )
        })}
      </ul>
      <Button type="submit" onClick={checkCorrect}>
        <FormattedMessage id="quests.imageCombination.playView.CheckResult" />
      </Button>
    </div>
  )
}
export default PlayView
