import './customBlocks/customBlocks'
import React, { useState } from 'react'
import { BlocklyWorkspace } from 'react-blockly'
import Blockly from 'blockly'
import { toolbox } from 'core/utils'
import { SPRITE } from 'core/sprites'
import height = module

const PlayView = () => {
  const [xml, setXml] = useState('')
  const [javascriptCode, setJavascriptCode] = useState('')

  const initialXml =
    '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="text" x="70" y="30"><field name="TEXT"></field></block></xml>'

  var toolboxCategories = {
    kind: 'categoryToolbox',
    contents: [
      {
        kind: 'category',
        name: 'Control',
        contents: [
          {
            kind: 'block',
            type: 'controls_if',
          },
        ],
      },
      {
        kind: 'category',
        name: 'Logic',
        contents: [
          {
            kind: 'block',
            type: 'logic_compare',
          },
          {
            kind: 'block',
            type: 'logic_operation',
          },
          {
            kind: 'block',
            type: 'logic_boolean',
          },
        ],
      },
      {
        kind: 'category',
        name: 'Custom',
        colour: '#5CA699',
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

  //test
  Blockly.inject('blocklyDiv', {
    toolbox: toolboxCategories,
    grid: {
      spacing: 20,
      length: 5,
      colour: '#ccc',
      snap: true,
    },
    move: {
      scrollbars: {
        horizontal: true,
        vertical: true,
      },
      drag: true,
      wheel: false,
    },
    zoom: {
      controls: true,
      wheel: true,
      startScale: 1.0,
      maxScale: 3,
      minScale: 0.3,
      scaleSpeed: 1.2,
      pinch: true,
    },
    trashcan: true,
  })

  return <div id={'blocklyDiv'}></div>
}

export default PlayView
