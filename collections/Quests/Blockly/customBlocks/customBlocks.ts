import Blockly from 'blockly'

Blockly.Blocks['direction'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('move')
      .appendField(
        new Blockly.FieldDropdown([
          ['forward', 'forward'],
          ['backward', 'backward'],
        ]),
        'direction',
      )
      .appendField('by')
      .appendField(
        new Blockly.FieldDropdown([
          ['50', '50'],
          ['100', '100'],
          ['200', '200'],
        ]),
        'distance',
      )
    this.setInputsInline(true)
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour(160)
    this.setTooltip('How far and in which direction do you want to move')
    this.setHelpUrl('')
  },
}

Blockly.Blocks['turn_angle'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(
        new Blockly.FieldDropdown([
          ['turn right', 'turn right'],
          ['turn left', 'turn left'],
        ]),
        'direction',
      )
      .appendField('by')
      .appendField(
        new Blockly.FieldDropdown([
          ['90°', '90°'],
          ['120°', '120°'],
          ['145°', '145°'],
        ]),
        'distance',
      )
    this.setInputsInline(true)
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour(160)
    this.setTooltip('How far and in which direction do you want to move')
    this.setHelpUrl('')
  },
}
