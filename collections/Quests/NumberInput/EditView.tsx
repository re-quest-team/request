import { useForm } from 'react-hook-form'
import { InputField } from '@/components/Elements/FormElements'
import { useQuestStore } from './store'
import { valNumberInput } from '@/collections/Quests/NumberInput/validation'
import { yupResolver } from '@hookform/resolvers/yup'
import { SelectField } from '@/components/Elements/Select/SelectField'
import { Units } from '@/collections/Quests/NumberInput/units'
import { SelectOption } from '@/components/Elements/Select'

const unitOptions: SelectOption[] = [
  { value: Units.None },
  { value: Units.Meter },
  { value: Units.Millimeter },
  { value: Units.Centimeter },
  { value: Units.Decimeter },
  { value: Units.Kilometer },
  { value: Units.Squaremeter },
  { value: Units.Squarekilometer },
  { value: Units.Cubicmeter },
  { value: Units.Litre },
  { value: Units.Millilitre },
  { value: Units.Centilitre },
  { value: Units.Decilitre },
  { value: Units.Hectolitre },
  { value: Units.Kilogram },
  { value: Units.Milligram },
  { value: Units.Gram },
  { value: Units.Pound },
  { value: Units.Radian },
  { value: Units.Degree },
  { value: Units.Second },
  { value: Units.Minute },
  { value: Units.Hour },
  { value: Units.Day },
  { value: Units.Percent },
]

const EditView = () => {
  const question = useQuestStore(state => state.question)
  const setQuestion = useQuestStore(state => state.setQuestion)
  const answer = useQuestStore(state => state.answer)
  const setAnswer = useQuestStore(state => state.setAnswer)
  const unit = useQuestStore(state => state.unit)
  const setUnit = useQuestStore(state => state.setUnit)
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

  const changedData = async (data: any) => {}

  const selectedField = (data: any) => {
    setUnit(data.value)
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
      <SelectField
        label="Einheit"
        options={unitOptions}
        onSelect={selectedField}
      ></SelectField>
    </form>
  )
}

export default EditView
