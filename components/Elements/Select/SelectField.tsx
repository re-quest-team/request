import Select, { SelectProps } from '.'

import {
  FieldWrapper,
  FieldWrapperPassThroughProps,
} from '../FormElements/FieldWrapper'

type SelectFieldProps = FieldWrapperPassThroughProps & SelectProps

export const SelectField = (props: SelectFieldProps) => {
  const { label } = props
  return (
    <FieldWrapper label={label}>
      <Select options={props.options} onSelect={props.onSelect} />
    </FieldWrapper>
  )
}
