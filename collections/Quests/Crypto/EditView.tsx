import { InputField } from '@/components/Elements/FormElements'
import { useQuestStore } from './store'
import { useIntl } from 'react-intl'

const EditView = () => {
  const intl = useIntl()

  const question = useQuestStore(state => state.question)
  const setQuestion = useQuestStore(state => state.setQuestion)

  const codeword = useQuestStore(state => state.codeword)
  const setCordeword = useQuestStore(state => state.setCordeword)

  return (
    <div>
      <InputField
        label={intl.formatMessage({ id: 'quests.crypto.editView.labelTask' })}
        defaultValue={question}
        onChange={e => setQuestion(e.target.value)}
      ></InputField>
      <InputField
        label={intl.formatMessage({
          id: 'quests.crypto.editView.labelCodeWord',
        })}
        defaultValue={codeword}
        onChange={e => setCordeword(e.target.value)}
      ></InputField>
      <InputField
        label={intl.formatMessage({
          id: 'quests.crypto.editView.labelEncryptedWord',
        })}
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
