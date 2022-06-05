import { useForm } from 'react-hook-form'
import { InputField } from '@/components/Elements/FormElements'
import { useQuestStore } from './store'
import { valNumberInput } from '@/collections/Quests/NumberInput/validation'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import { Game } from '@prisma/client'
import toast from 'react-hot-toast'
import quest from '@/pages/api/quest'

const EditView = () => {
  const question = useQuestStore(state => state.question)
  const setQuestion = useQuestStore(state => state.setQuestion)

  const answer = useQuestStore(state => state.answer)
  const setAnswer = useQuestStore(state => state.setAnswer)
  const formOptions = { resolver: yupResolver(valNumberInput) }
  const { register, handleSubmit, reset, formState } = useForm(formOptions)
  const { errors } = formState
  const onSubmit = data => {
    alert(JSON.stringify(data))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputField
        label="Aufgabenstellung"
        defaultValue={question}
        name={question}
        registration={register('question')}
        error={errors['question']}
        onChange={e => setQuestion(e.target.value)}
      ></InputField>
      <InputField
        label="Antwort"
        defaultValue={answer}
        name={'answer'}
        registration={register('answer')}
        error={errors['answer']}
        onChange={e => {
          console.log('changes')
          console.log(errors)
          setAnswer(Number(e.target.value))
        }}
      ></InputField>
    </form>
  )
}

export default EditView
