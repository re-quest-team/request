import React, { useCallback, useState } from 'react'
import {
  Descendant,
  createEditor,
  Editor,
  Element as SlateElement,
  Transforms,
} from 'slate'
import { Slate, Editable, withReact, useSlate } from 'slate-react'
import { CustomEditor, CustomElement, CustomText } from './Types'
import { EditorButton } from './EditorButton'
import { useIntl } from 'react-intl'

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor
    Element: CustomElement
    Text: CustomText
  }
}

export const RichTextEditor = () => {
  const intl = useIntl()
  const [editor] = useState(() => withReact(createEditor()))

  const initialValue: Descendant[] = [
    {
      type: 'paragraph',
      children: [{ text: intl.formatMessage({ id: 'page.home.loremIpsum' }) }],
    },
  ]

  const renderElement = useCallback((props: any) => {
    return <EditorElement {...props} />
  }, [])
  const renderLeaf = useCallback((props: any) => {
    return <EditorLeaf {...props} />
  }, [])

  // TODO: Add Toolbar
  // TODO: Add Headings
  // TODO: Add alignments
  return (
    <Slate editor={editor} value={initialValue}>
      <MarkButton format="bold" icon="Bold" />
      <MarkButton format="italic" icon="Italic" />
      <MarkButton format="underscored" icon="Underscore" />
      <BlockButton format="quote" icon="Quote" />
      <BlockButton format="numbered-list" icon="List #" />
      <BlockButton format="itemized-list" icon="Item #" />
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        autoFocus
        spellCheck
      />
    </Slate>
  )
}

/*
    Helper functions
*/

type MarkType = 'italic' | 'bold' | 'underscored'
type BlockType =
  | 'paragraph'
  | 'code'
  | 'quote'
  | 'numbered-list'
  | 'itemized-list'
  | 'heading'

const isMarkActive = (editor: CustomEditor, type: MarkType) => {
  const marks = Editor.marks(editor)
  return marks ? marks[type] === true : false
}

const toggleMark = (editor: CustomEditor, type: MarkType) => {
  const isActive = isMarkActive(editor, type)
  if (isActive) {
    Editor.removeMark(editor, type)
  } else {
    Editor.addMark(editor, type, true)
  }
}

const isBlockActive = (editor: CustomEditor, type: string) => {
  const { selection } = editor
  if (!selection) return false

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: n =>
        !Editor.isEditor(n) && SlateElement.isElement(n) && n['type'] === type,
    }),
  )

  return !!match
}

const toggleBlock = (editor: CustomEditor, bType: BlockType) => {
  const listTypes = ['itemized-list', 'numbered-list']
  const isActive = isBlockActive(editor, bType)
  const isList = listTypes.includes(bType)

  Transforms.unwrapNodes(editor, {
    match: n =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      listTypes.includes(n.type),
    split: true,
  })

  let newProperties: Partial<SlateElement>
  newProperties = {
    type: isActive ? 'paragraph' : isList ? 'itemized-list' : bType,
  }
  Transforms.setNodes<SlateElement>(editor, newProperties)

  if (!isActive && isList) {
    const newChildren: CustomText[] = []
    const block = { type: bType.toString(), children: [] }
    // @ts-ignore
    // TODO: investigate
    Transforms.wrapNodes(editor, block)
  }
}

/*
    Renders
*/

const CodeElement = (props: any) => {
  return <code {...props.attributes}>{props.children}</code>
}

const ParagraphElement = (props: any) => {
  return <p {...props.attributes}>{props.children}</p>
}

const QuoteElement = (props: any) => {
  return <blockquote {...props.attributes}>{props.children}</blockquote>
}

const HeadingElement = (props: any) => {
  switch (props.element.level) {
    case 1:
      return <h1 {...props.attributes}>{props.children}</h1>
    case 2:
      return <h2 {...props.attributes}>{props.children}</h2>
    default:
      return <h1 {...props.attributes}>{props.children}</h1>
  }
}

const ItemizedListElement = (props: any) => {
  return <li {...props.attributes}>{props.children}</li>
}

const NumberedListElement = (props: any) => {
  return <ol {...props.attributes}>{props.children}</ol>
}

const DefaultElement = (props: any) => {
  return <p {...props.attributes}>{props.children}</p>
}

const EditorElement = (props: any) => {
  switch (props.element.type) {
    case 'code':
      return <CodeElement {...props} />
    case 'paragraph':
      return <ParagraphElement {...props} />
    case 'quote':
      return <QuoteElement {...props} />
    case 'itemized-list':
      return <ItemizedListElement {...props} />
    case 'numbered-list':
      return <NumberedListElement {...props} />
    case 'heading':
      return <HeadingElement {...props} />
    default:
      return <DefaultElement {...props} />
  }
}

const EditorLeaf = (props: any) => {
  let leaf = props.leaf
  let children = props.children

  if (leaf.bold) {
    children = <strong>{children}</strong>
  }
  if (leaf.italic) {
    children = <em>{children}</em>
  }
  if (leaf.underscored) {
    children = <u>{children}</u>
  }

  return <span {...props.attributes}>{children}</span>
}

/*
    Buttons
*/

// TODO: Add icon and toggle button
// @ts-ignore
const MarkButton = ({ format, icon }) => {
  const editor = useSlate()
  return (
    <EditorButton
      type="button"
      onClick={event => {
        event.preventDefault()
        toggleMark(editor, format)
      }}
    >
      <span>{icon}</span>
    </EditorButton>
  )
}

// TODO: Add icon and toggle button
// @ts-ignore
const BlockButton = ({ format, icon }) => {
  const editor = useSlate()
  return (
    <EditorButton
      type="button"
      onClick={event => {
        event.preventDefault()
        toggleBlock(editor, format)
      }}
    >
      <span>{icon}</span>
    </EditorButton>
  )
}
