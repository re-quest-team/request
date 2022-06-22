import { BaseEditor } from 'slate'
import { ReactEditor } from 'slate-react'
import { HistoryEditor } from 'slate-history'

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor

/*
    Element types
*/

export type ParagraphElement = {
  type: 'paragraph'
  children: CustomText[]
}

export type CodeElement = {
  type: 'code'
  children: CustomText[]
}

export type QuoteElement = {
  type: 'quote'
  children: CustomText[]
}

export type NumberedListElement = {
  type: 'numbered-list'
  children: CustomText[]
}

export type ItemizedListElement = {
  type: 'itemized-list'
  children: CustomText[]
}

export type HeadingElement = {
  type: 'heading'
  level: number
  children: CustomText[]
}

export type CustomElement =
  | ParagraphElement
  | CodeElement
  | QuoteElement
  | HeadingElement
  | ItemizedListElement
  | NumberedListElement

/*
    Text types
*/

export type FormattedText = {
  text: string
  bold?: true
  italic?: true
  underscored?: true
}

export type CustomText = FormattedText
