import { useForm } from 'react-hook-form'
import { InputField } from '@/components/Elements/FormElements'
import { useQuestStore } from './store'
import { valNumberInput } from '@/collections/Quests/NumberInput/validation'
import { yupResolver } from '@hookform/resolvers/yup'
import { SelectField } from '@/components/Elements/Select/SelectField'
import { Units } from '@/collections/Quests/NumberInput/units'
import { SelectOption } from '@/components/Elements/Select'
import { useIntl } from 'react-intl'

const unitOptions: SelectOption[] = Object.values(Units).map(unit => ({
  value: unit,
}))

const EditView = () => {
  const intl = useIntl()

  const question = useQuestStore(state => state.question)
  const setQuestion = useQuestStore(state => state.setQuestion)
  const answer = useQuestStore(state => state.answer)
  const setAnswer = useQuestStore(state => state.setAnswer)
  const unit = useQuestStore(state => state.unit)
  const setUnit = useQuestStore(state => state.setUnit)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(valNumberInput(intl)),
    mode: 'all',
    criteriaMode: 'all',
  })
  const changedData = async (data: any) => {}

  const selectedField = (data: any) => {
    setUnit(data.value)
  }

  return (
    <form onInput={handleSubmit(changedData)}>
      <InputField
        label={intl.formatMessage({
          id: 'editView.labelTask',
        })}
        defaultValue={question}
        registration={register('question')}
        error={errors['question']}
        onChange={e => {
          setQuestion(e.target.value)
        }}
      ></InputField>
      <InputField
        label={intl.formatMessage({
          id: 'editView.labelAnswer',
        })}
        defaultValue={answer}
        registration={register('answer')}
        error={errors['answer']}
        onChange={e => {
          setAnswer(Number(e.target.value))
        }}
      ></InputField>
      <SelectField
        label={intl.formatMessage({
          id: 'editView.labelUnit',
        })}
        options={unitOptions}
        onSelect={selectedField}
      ></SelectField>
    </form>
  )
}

export default EditView
