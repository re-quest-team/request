import { successConfetti } from '@/components/Confetti'
import { Button } from '@/components/Elements/Button'
import { InputField } from '@/components/Elements/FormElements'
import { incorrectToast, successToast } from '@/components/Toasts'
import React, { useState } from 'react'
import { useQuestStore } from './store'
import { FormattedMessage, useIntl } from 'react-intl'
import Image from 'next/image'

const PlayView = () => {
  const task = useQuestStore(state => state.task)
  const imageToBeCombined = useQuestStore(state => state.imageToBeCombined)
  const imagesToCombineRight = useQuestStore(
    state => state.imagesToCombineRight,
  )
  const imagesToCombineWrong = useQuestStore(
    state => state.imagesToCombineWrong,
  )
  const imagesToCombine = imagesToCombineRight.concat(imagesToCombineWrong)

  const imagesToCombineMap = new Map()
  const alreadyUsed = new Set()
  const imagesToCombineRandomOrder = new Array(imagesToCombineMap.size)
  let i = 0

  // Evtl zeug davon in store speichern?
  while (imagesToCombine.length != imagesToCombineMap.size) {
    const randomInt = Math.floor(Math.random() * imagesToCombine.length)
    if (!alreadyUsed.has(randomInt)) {
      imagesToCombineMap.set(
        imagesToCombine[randomInt],
        imagesToCombineRight.includes(imagesToCombine[randomInt]),
      )
      imagesToCombineRandomOrder[i] = imagesToCombine[randomInt]
      alreadyUsed.add(randomInt)
      i++
    }
  }
  function onSolve() {
    let result = false
    if (answers.length != imagesToCombineRight.length) result = false
    else {
      for (let i = 0; i < answers.length; i++) {
        result = result && imagesToCombineMap.get(answers[i])
      }
    }
    return result
  }

  //const onSolve = useQuestStore(state => state.onSolve)
  //const correct = useQuestStore(state => state.correct)

  //const [answer, setAnswer] = useState('')
  //const [selectedAnswer, setSelectedAnswer] = useState<String>()

  let answers = new Array()

  function setTest(test: string) {
    answers = answers.concat([test])
  }

  const intl = useIntl()
  const toBeCombined = intl.formatMessage({
    id: 'quests.imageCombination.playView.imageToBeCombined',
  })
  const chose = intl.formatMessage({
    id: 'quests.imageCombination.playView.chose',
  })

  const radioHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTest(event.target.value)
    //setSelectedAnswer(event.target.value)
    //setAnswer(event.target.value)
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
            <input
              type="radio"
              id={test}
              name={test}
              value={test}
              onChange={radioHandler}
            ></input>
          </>
        )
      })}
      <Button
        onClick={() => {
          if (onSolve()) {
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
