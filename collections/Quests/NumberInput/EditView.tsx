import { useForm } from 'react-hook-form'
import { InputField } from '@/components/Elements/FormElements'
import { useQuestStore } from './store'
import { formOptions } from '@/collections/Quests/NumberInput/validation'

const EditView = () => {
  const question = useQuestStore(state => state.question)
  const setQuestion = useQuestStore(state => state.setQuestion)

  const answer = useQuestStore(state => state.answer)
  const setAnswer = useQuestStore(state => state.setAnswer)

  const { register, handleSubmit, reset, formState } = useForm(formOptions)
  const { errors } = formState

  return (
    <>
      <InputField
        label="Aufgabenstellung"
        defaultValue={question}
        onChange={e => setQuestion(e.target.value)}
      ></InputField>
      <InputField
        label="Antwort"
        defaultValue={answer}
        name={'answer'}
        registration={register('answer')}
        error={errors.answer}
        onChange={e => {
          setAnswer(Number(e.target.value))
        }}
      ></InputField>
    </>
  )
}

export default EditView
