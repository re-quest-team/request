import './customBlocks/customBlocks'
import './Test'
import React, { useState } from 'react'
import Blockly from 'blockly'
import { BlocklyWorkspace } from 'react-blockly'
import { Simulate } from 'react-dom/test-utils'
import error = Simulate.error
import { Button } from '@/components/Elements/Button'
import { Test } from '@/collections/Quests/Blockly/Test'

const PlayView = () => {
  const [xml, setXml] = useState('')
  const [javascriptCode, setJavascriptCode] = useState('')

  const initialXml =
    '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="text" x="70" y="30"><field name="TEXT"></field></block></xml>'
  const toolboxCategories = {
    kind: 'categoryToolbox',
    contents: [
      {
        kind: 'category',
        name: 'Logic',
        colour: '#5C81A6',
        contents: [
          {
            kind: 'block',
            type: 'controls_if',
          },
          {
            kind: 'block',
            type: 'logic_compare',
          },
        ],
      },
      {
        kind: 'category',
        name: 'Math',
        colour: '#5CA65C',
        contents: [
          {
            kind: 'block',
            type: 'math_round',
          },
          {
            kind: 'block',
            type: 'math_number',
          },
        ],
      },
    ],
  }
  function workspaceDidChange(workspace) {
    const code = Blockly.JavaScript.workspaceToCode(workspace)
    setJavascriptCode(code)
  }

  return (
    <div>
      <div>test</div>
      <BlocklyWorkspace
        toolboxConfiguration={toolboxCategories}
        initialXml={initialXml}
        className="fill-height"
        workspaceConfiguration={{
          grid: {
            spacing: 20,
            length: 3,
            colour: '#ccc',
            snap: true,
          },
        }}
        onWorkspaceChange={workspaceDidChange}
        onXmlChange={setXml}
      />
      <div>test</div>
      <pre id="generated-xml">{xml}</pre>
      <textarea
        id="code"
        style={{ height: '600px', width: '400px' }}
        value={javascriptCode}
        readOnly
      ></textarea>
    </div>
  )
}

export default PlayView
