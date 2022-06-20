import { InputField } from '@/components/Elements/FormElements'
import { useQuestStore } from './store'
import { useIntl } from 'react-intl'
import { SelectOption } from '@/components/Elements/Select'
import { useEffect, useState } from 'react'
import { SelectField } from '@/components/Elements/Select/SelectField'
import FileUpload from '@/components/FileUpload'

const EditView = () => {
  const intl = useIntl()

  const imagesToBeCombinedSelection: SelectOption[] = [
    {
      value: intl.formatMessage({
        id: 'quests.imageCombination.uploadOwnImage',
      }),
    },
    {
      value: intl.formatMessage({
        id: 'quests.imageCombination.useExampleImage',
      }),
    },
  ]
  const imagesToCombineSelectionRight: SelectOption[] = [
    {
      value: intl.formatMessage({
        id: 'quests.imageCombination.uploadOwnImage',
      }),
    },
    {
      value: intl.formatMessage({
        id: 'quests.imageCombination.useExampleImage',
      }),
    },
  ]
  const imagesToCombineSelectionWrong: SelectOption[] = [
    {
      value: intl.formatMessage({
        id: 'quests.imageCombination.uploadOwnImage',
      }),
    },
    {
      value: intl.formatMessage({
        id: 'quests.imageCombination.useExampleImage',
      }),
    },
  ]

  const task_label = intl.formatMessage({
    id: 'quests.imageCombination.editView.labelTask',
  })
  const imageAim_label = intl.formatMessage({
    id: 'quests.imageCombination.editView.labelImageAim',
  })
  const imagePoolRight_label = intl.formatMessage({
    id: 'quests.imageCombination.editView.labelImagePoolRight',
  })
  const imagePoolWrong_label = intl.formatMessage({
    id: 'quests.imageCombination.editView.labelImagePoolWrong',
  })
  const task = intl.formatMessage({
    id: 'quests.imageCombination.description',
  })

  const [imageToBeCombinedSelection, setImageToBeCombinedSelection] = useState(
    imagesToBeCombinedSelection[0],
  )
  const [imageToCombineSelectionRight, setImagesToCombineSelectionRight] =
    useState(imagesToCombineSelectionRight[0])
  const [imageToCombineSelectionWrong, setImagesToCombineSelectionWrong] =
    useState(imagesToCombineSelectionRight[0])

  const setTask = useQuestStore(state => state.setTask)
  const setImageToBeCombined = useQuestStore(
    state => state.setImageToBeCombined,
  )
  const setImagesToCombineRight = useQuestStore(
    state => state.setImagesToCombineRight,
  )
  const setImagesToCombineWrong = useQuestStore(
    state => state.setImagesToCombineWrong,
  )

  // FileUpload is not implemented jet!!!!!!

  /*
  { data: quest } = useSWR<QuestWithImage>(`/api/quest/${questId}`)
  useEffect(() => {
    if (quest?.image?.url)
      setImageUrlToBeCombined(`${process.env.NEXT_PUBLIC_S3_BASE_URL}/${quest?.image?.url}`)
  }, [quest?.image?.url])
   */

  useEffect(() => {
    if (
      imageToBeCombinedSelection.value ===
      intl.formatMessage({ id: 'quests.imageCombination.useExampleImage' })
    ) {
      setImageToBeCombined(
        require('/assets/imageCombinationQuest/abstract.svg') as string,
      )
    }
  }, [imageToBeCombinedSelection.value, setImageToBeCombined, intl])

  useEffect(() => {
    if (
      imageToCombineSelectionRight.value ===
      intl.formatMessage({ id: 'quests.imageCombination.useExampleImage' })
    ) {
      setImagesToCombineRight([
        require('/assets/imageCombinationQuest/1.svg') as string,
        require('/assets/imageCombinationQuest/2.svg') as string,
        require('/assets/imageCombinationQuest/3.svg') as string,
        require('/assets/imageCombinationQuest/4.svg') as string,
      ])
    }
  }, [imageToCombineSelectionRight.value, setImagesToCombineRight, intl])

  useEffect(() => {
    if (
      imageToCombineSelectionWrong.value ===
      intl.formatMessage({ id: 'quests.imageCombination.useExampleImage' })
    ) {
      setImagesToCombineWrong([
        require('/assets/imageCombinationQuest/5.svg') as string,
      ])
    }
  }, [imageToCombineSelectionWrong.value, setImagesToCombineWrong, intl])

  return (
    <div>
      <InputField
        label={task_label}
        defaultValue={task}
        onChange={e => setTask(e.target.value)}
      ></InputField>

      <SelectField
        label={imageAim_label}
        options={imagesToBeCombinedSelection}
        onSelect={setImageToBeCombinedSelection}
      ></SelectField>
      <div className="relative my-4 w-full rounded">
        {imageToBeCombinedSelection.value ===
          intl.formatMessage({
            id: 'quests.imageCombination.uploadOwnImage',
          }) && (
          <FileUpload
            onChange={url =>
              setImageToBeCombined(
                `${process.env.NEXT_PUBLIC_S3_BASE_URL}/${url}`,
              )
            }
            roomId={'test1'}
          />
        )}
      </div>

      <SelectField
        label={imagePoolRight_label}
        options={imagesToCombineSelectionRight}
        onSelect={setImagesToCombineSelectionRight}
      ></SelectField>
      <div className="relative my-4 w-full rounded">
        {imageToCombineSelectionRight.value ===
          intl.formatMessage({
            id: 'quests.imageCombination.uploadOwnImage',
          }) && (
          <FileUpload
            onChange={url =>
              setImageToBeCombined(
                `${process.env.NEXT_PUBLIC_S3_BASE_URL}/${url}`,
              )
            }
            roomId={'test2'}
          />
        )}
      </div>

      <SelectField
        label={imagePoolWrong_label}
        options={imagesToCombineSelectionWrong}
        onSelect={setImagesToCombineSelectionWrong}
      ></SelectField>
      <div className="relative my-4 w-full rounded">
        {imageToCombineSelectionWrong.value ===
          intl.formatMessage({
            id: 'quests.imageCombination.uploadOwnImage',
          }) && (
          <FileUpload
            onChange={url =>
              setImageToBeCombined(
                `${process.env.NEXT_PUBLIC_S3_BASE_URL}/${url}`,
              )
            }
            roomId={'test3'}
          />
        )}
      </div>
    </div>
  )
}
export default EditView
