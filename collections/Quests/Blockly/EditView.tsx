import { useQuestStore } from '@/collections/Quests/Blockly/store'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { valNumberInput } from '@/collections/Quests/NumberInput/validation'
import { SelectField } from '@/components/Elements/Select/SelectField'
import { SelectOption } from '@/components/Elements/Select'
import { CodingQuests } from '@/collections/Quests/Blockly/codingQuests'

const codingQuestOptions: SelectOption[] = Object.values(CodingQuests).map(
  codingQuests => ({
    value: codingQuests,
  }),
)

const EditView = () => {
  const setCodingTask = useQuestStore(state => state.setCodingQuest)
  const { handleSubmit } = useForm({
    resolver: yupResolver(valNumberInput),
    mode: 'all',
    criteriaMode: 'all',
  })
  const changedData = async (data: any) => {}

  const selectedField = (data: any) => {
    setCodingTask(data.value)
  }
  return (
    <form onInput={handleSubmit(changedData)}>
      <SelectField
        label="Coding Aufgabe"
        options={codingQuestOptions}
        onSelect={selectedField}
      ></SelectField>
    </form>
  )
}

export default EditView
