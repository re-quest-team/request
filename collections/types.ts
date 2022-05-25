import { QuestType } from '@prisma/client'
import React from 'react'
import { Icon } from 'react-feather'

export interface IQuest<T> {
  type: QuestType
  title: string
  description: string
  icon: ((props: React.ComponentProps<'svg'>) => JSX.Element) | Icon
  EditView: () => React.ReactElement
  onSave: () => T
  PlayView: () => React.ReactElement
  onLoad: (data: T) => any
  data?: T
  onSolve?: (callabck: () => void) => void
}
