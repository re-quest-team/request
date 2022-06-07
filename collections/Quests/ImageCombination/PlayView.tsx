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
  const encryptWord = intl.formatMessage({
    id: 'quests.crypto.playView.encryptedWord',
  })
  const codeWord = intl.formatMessage({ id: 'quests.crypto.playView.codeWord' })

  return (
    <div>
      <p>{task}</p>
      <div className="relative hidden h-8 w-28 lg:block">
        <Image
          src={imageToBeCombined}
          alt="Hier sollte das Bild, das kombiniert werden soll, sein"
          height={300}
          width={300}
        />
      </div>
      <p>{'Wähle die Richtigen Bilder aus'}</p>
      <div className="relative hidden h-8 w-28 lg:block">
        <Image
          src={imagesToCombineRight[0]}
          alt="Hier sollte ein Bild sein"
          height={300}
          width={300}
        />
      </div>
      <div className="relative hidden h-8 w-28 lg:block">
        <Image
          src={imagesToCombineWrong[0]}
          alt="Hier sollte ein Bild sein"
          height={300}
          width={300}
        />
      </div>
    </div>
  )
}

export default PlayView
