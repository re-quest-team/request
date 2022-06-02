import { InputField } from '@/components/Elements/FormElements'
import { useQuestStore } from './store'
import { useIntl } from 'react-intl'

const EditView = () => {
  const intl = useIntl()

  const label1 = intl.formatMessage({ id: 'quests.crypto.editView.labelTask' })
  const label2 = intl.formatMessage({
    id: 'quests.crypto.editView.labelCodeWord',
  })
  const label3 = intl.formatMessage({
    id: 'quests.crypto.editView.labelEncryptedWord',
  })

  const question = useQuestStore(state => state.question)
  const setQuestion = useQuestStore(state => state.setQuestion)

  const codeword = useQuestStore(state => state.codeword)
  const setCordeword = useQuestStore(state => state.setCordeword)

  return (
    <div>
      <InputField
        label={label1}
        defaultValue={question}
        onChange={e => setQuestion(e.target.value)}
      ></InputField>
      <InputField
        label={label2}
        defaultValue={codeword}
        onChange={e => setCordeword(e.target.value)}
      ></InputField>
      <InputField
        label={label3}
        disabled
        value={codeword.replace(
          /[A-Z]/gi,
          c =>
            'NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm'[
              'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.indexOf(c)
            ],
        )}
      ></InputField>
    </div>
  )
}

export default EditView
