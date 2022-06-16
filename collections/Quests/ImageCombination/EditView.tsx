import { InputField } from '@/components/Elements/FormElements'
import { useQuestStore } from './store'
import { useIntl } from 'react-intl'
import { SelectOption } from '@/components/Elements/Select'
import { useEffect, useState } from 'react'
import { SelectField } from '@/components/Elements/Select/SelectField'
import FileUpload from '@/components/FileUpload'

import useSWR from 'swr'

type Props = {
  questId: string
}

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

  const [imageToBeCombinedSelection, setImageToBeCombinedSelection] = useState(
    imagesToBeCombinedSelection[0],
  )
  const [imageToCombineSelectionRight, setImagesToCombineSelectionRight] =
    useState(imagesToCombineSelectionRight[0])
  const [imageToCombineSelectionWrong, setImagesToCombineSelectionWrong] =
    useState(imagesToCombineSelectionRight[0])

  const [imageUrlToBeCombined, setImageUrlToBeCombined] = useState('')
  const [imageUrlToCombineRight, setImageUrlToCombineRight] = useState('')
  const [imageUrlToCombineWrong, setImageUrlToCombineWrong] = useState('')

  // { data: quest } = useSWR<QuestWithImage>(`/api/quest/${questId}`)

  const task = useQuestStore(state => state.task)
  const setTask = useQuestStore(state => state.setTask)
  const imageToBeCombined = useQuestStore(state => state.imageToBeCombined)
  const setImageToBeCombined = useQuestStore(
    state => state.setImageToBeCombined,
  )
  const imagesToCombineRight = useQuestStore(
    state => state.imagesToCombineRight,
  )
  const setImagesToCombineRight = useQuestStore(
    state => state.setImagesToCombineRight,
  )
  const imagesToCombineWrong = useQuestStore(
    state => state.imagesToCombineWrong,
  )
  const setImagesToCombineWrong = useQuestStore(
    state => state.setImagesToCombineWrong,
  )

  /*
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
      setImageUrlToBeCombined(
        require('/assets/imageCombinationQuest/abstract.svg'),
      ) //.default.src,)
      setImageToBeCombined(
        require('/assets/imageCombinationQuest/abstract.svg'),
      )
    }
  }, [imageToBeCombinedSelection.value])

  useEffect(() => {
    if (
      imageToCombineSelectionRight.value ===
      intl.formatMessage({ id: 'quests.imageCombination.useExampleImage' })
    ) {
      setImageUrlToCombineRight(require('/assets/imageCombinationQuest/1.svg')) //.default.src,)
      setImagesToCombineRight([
        require('/assets/imageCombinationQuest/1.svg'),
        require('/assets/imageCombinationQuest/2.svg'),
        require('/assets/imageCombinationQuest/3.svg'),
        require('/assets/imageCombinationQuest/4.svg'),
      ])
    }
  }, [imageToCombineSelectionRight.value, intl])

  useEffect(() => {
    if (
      imageToCombineSelectionWrong.value ===
      intl.formatMessage({ id: 'quests.imageCombination.useExampleImage' })
    ) {
      setImageUrlToCombineWrong(require('/assets/imageCombinationQuest/5.svg')) //.default.src,)
      setImagesToCombineWrong([require('/assets/imageCombinationQuest/5.svg')])
    }
  }, [imageToCombineSelectionWrong.value, intl])

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
              setImageUrlToBeCombined(
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
              setImageUrlToCombineRight(
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
              setImageUrlToCombineWrong(
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
