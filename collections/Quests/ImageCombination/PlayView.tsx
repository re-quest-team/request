import { successConfetti } from '@/components/Confetti'
import { Button } from '@/components/Elements/Button'
import { InputField } from '@/components/Elements/FormElements'
import { incorrectToast, successToast } from '@/components/Toasts'
import React, { useState } from 'react'
import { useQuestStore } from './store'
import { FormattedMessage, useIntl } from 'react-intl'
import Image from 'next/image'
import { getValue } from 'tsparticles-engine'

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
  const imagesToCombineRight = useQuestStore(
    state => state.imagesToCombineRight,
  )
  const imagesToCombineWrong = useQuestStore(
    state => state.imagesToCombineWrong,
  )

  const imagesToCombineRandomOrder = useQuestStore(
    state => state.imagesToCombineRandomOrder,
  )

  const onSolve = useQuestStore(state => state.onSolve)
  const correct = useQuestStore(state => state.correct)

  const answersGiven = new Map()

  for (let i = 0; i < imagesToCombineRandomOrder.length; i++) {
    answersGiven.set(imagesToCombineRandomOrder[i], false)
  }

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    let image = event.target.value
    if (event.target.checked) {
      answersGiven.set(image, true)
    } else {
      answersGiven.set(image, false)
    }
  }

  function checkAnswers() {
    let result
    if (answersGiven.get(imagesToCombineRandomOrder[0]) == false) {
      result = false
    } else {
      result = true
    }
    /*
    for (let i = 0; i < imagesToCombineRandomOrder.length; i++) {
      if (answersGiven.get(imagesToCombineRandomOrder[i]) === false) {
        if (imagesToCombineRight.includes(imagesToCombineRandomOrder[i])) {
          result = false
        } else {
          result = result && true
        }
      } else {
        if (imagesToCombineRight.includes(imagesToCombineRandomOrder[i])) {
          result = result && true
        } else {
          result = false
        }
      }
    }

     */
    return result
  }

  function checkCorrect() {
    if (checkAnswers()) {
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
      <Image
        src={imageToBeCombined}
        alt="Image to be combined"
        height={300}
        width={300}
      />
      <p>{chose}</p>
      {imagesToCombineRandomOrder.map(test => {
        return (
          <>
            <Image src={test} alt="Image to combine" height={300} width={300} />
            <input value={test} type="checkbox" onChange={handleCheck} />
          </>
        )
      })}

      <Button type="submit" onClick={checkCorrect}>
        <FormattedMessage id="quests.imageCombination.playView.CheckResult" />
      </Button>
    </div>
  )
}

/*
      <Button
        onClick={() => {
          //if (onSolve(answersGiven, imagesToCombineRandomOrder, imagesToCombineRight)) {
          if (checkAnswers()){
            successToast(intl)
            successConfetti()
          } else {
            incorrectToast(intl)
          }
        }}
      >
 */

export default PlayView
