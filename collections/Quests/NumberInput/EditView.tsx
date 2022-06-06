import { useForm } from 'react-hook-form'
import { InputField } from '@/components/Elements/FormElements'
import { useQuestStore } from './store'
import { valNumberInput } from '@/collections/Quests/NumberInput/validation'
import { yupResolver } from '@hookform/resolvers/yup'

const EditView = () => {
  const question = useQuestStore(state => state.question)
  const setQuestion = useQuestStore(state => state.setQuestion)
  const answer = useQuestStore(state => state.answer)
  const setAnswer = useQuestStore(state => state.setAnswer)
  const formOptions = {
    resolver: yupResolver(valNumberInput),
    mode: 'all',
    criteriaMode: 'all',
  }
  // @ts-ignore
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions)
  const changedData = (data: any) => {
    console.log(data)
  }

  return (
    <form onInput={handleSubmit(changedData)}>
      <InputField
        label="Aufgabenstellung"
        defaultValue={question}
        registration={register('question')}
        error={errors['question']}
        onChange={e => {
          setQuestion(e.target.value)
        }}
      ></InputField>
      <InputField
        label="Antwort"
        defaultValue={answer}
        registration={register('answer')}
        error={errors['answer']}
        onChange={e => {
          setAnswer(Number(e.target.value))
        }}
      ></InputField>
    </form>
  )
}

export default EditView
