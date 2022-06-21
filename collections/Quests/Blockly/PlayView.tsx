import './customBlocks/customBlocks'
import React, { useRef, useState } from 'react'
import Blockly from 'blockly'
import { BlocklyWorkspace, useBlocklyWorkspace } from 'react-blockly'

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
        name: 'Custom',
        colour: '#5C81A6',
        contents: [
          {
            kind: 'block',
            type: 'turn_angle',
          },
          {
            kind: 'block',
            type: 'direction',
          },
        ],
      },
    ],
  }

  function workspaceDidChange(workspace) {
    const code = Blockly.JavaScript.workspaceToCode(workspace)
    setJavascriptCode(code)
  }

  const editorDiv = React.useRef(null)

  return (
    <div>
      <div>test</div>
      <BlocklyWorkspace
        ref={editorDiv}
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
      {/*<pre id="generated-xml">{xml}</pre>*/}
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
