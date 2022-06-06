import { useForm } from 'react-hook-form'
import { InputField } from '@/components/Elements/FormElements'
import { useQuestStore } from './store'
import { valNumberInput } from '@/collections/Quests/NumberInput/validation'
import { yupResolver } from '@hookform/resolvers/yup'
import { SelectField } from '@/components/Elements/Select/SelectField'
import { Units } from '@/collections/Quests/NumberInput/units'
import { useState } from 'react'
import { SelectOption } from '@/components/Elements/Select'

/*const unitOptions: SelectOption[] [
    {value: ''},
    { value: 'm'},
    { value: 'mm'},
    { value: 'cm'},
    { value: 'dm'},
    { value: 'km'},
    { value: 'qm'},
    { value: 'qkm'},
    { value: 'm³'},
    { value: 'l'},
    { value:'ml'},
    { value: 'cl'},
    { value: 'dl'},
    { value: 'hl'},
    { value: 'kg'},
    { value: 'mg'},
    { value: 'g'},
    { value: 'lb'},
    { value: 'rad'},
    { value: '°'},
    { value: 's'},
    { value: 'min'},
    { value: 'h'},
    { value: 'd'},
    { value: '%'},
]*/

const EditView = () => {
  const question = useQuestStore(state => state.question)
  const setQuestion = useQuestStore(state => state.setQuestion)
  const answer = useQuestStore(state => state.answer)
  const setAnswer = useQuestStore(state => state.setAnswer)
  const [unit, setUnit] = useState(Units.None)
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
        unit={unit}
        onChange={e => {
          setAnswer(Number(e.target.value))
        }}
      ></InputField>
      <SelectField label="Thema" options={Units}></SelectField>
    </form>
  )
}

export default EditView
