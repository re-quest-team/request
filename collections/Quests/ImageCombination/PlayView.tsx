import { successConfetti } from '@/components/Confetti'
import { Button } from '@/components/Elements/Button'
import { InputField } from '@/components/Elements/FormElements'
import { incorrectToast, successToast } from '@/components/Toasts'
import { useState } from 'react'
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
      <Image
        src={imagesToCombineRight[0]}
        alt="Hier sollte ein Bild sein"
        height={300}
        width={300}
      />
      <Image
        src={imagesToCombineWrong[0]}
        alt="Hier sollte ein Bild sein"
        height={300}
        width={300}
      />
    </div>
  )
}

export default PlayView
