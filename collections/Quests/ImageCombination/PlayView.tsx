import { successConfetti } from '@/components/Confetti'
import { Button } from '@/components/Elements/Button'
import { InputField } from '@/components/Elements/FormElements'
import { incorrectToast, successToast } from '@/components/Toasts'
import { useState } from 'react'
import { useQuestStore } from './store'
import { FormattedMessage, useIntl } from 'react-intl'
import Image from 'next/image'
import { iterator } from 'rxjs/dist/types/internal/symbol/iterator'

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

  const onSolve = useQuestStore(state => state.onSolve)
  const correct = useQuestStore(state => state.correct)

  const [answer, setAnswer] = useState('')

  const intl = useIntl()
  const toBeCombined = intl.formatMessage({
    id: 'quests.imageCombination.playView.imageToBeCombined',
  })
  const chose = intl.formatMessage({
    id: 'quests.imageCombination.playView.chose',
  })

  return (
    <div>
      <p>{task}</p>
      <p>{toBeCombined}</p>
      <Image
        src={imageToBeCombined}
        alt="Hier sollte das Bild, das kombiniert werden soll, sein"
        height={300}
        width={300}
      />
      <p>{chose}</p>
      {imagesToCombineRandomOrder.map(test => {
        var image = (
          <>
            <Image
              src={test}
              alt="Hier sollte das Bild, das kombiniert werden soll, sein"
              height={300}
              width={300}
            />
          </>
        )
        return image
      })}
    </div>
  )
}

export default PlayView
