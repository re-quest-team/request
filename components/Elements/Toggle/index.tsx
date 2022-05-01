import { InputHTMLAttributes } from 'react'
import {
  FieldWrapper,
  FieldWrapperPassThroughProps,
} from '../FormElements/FieldWrapper'

type ToggleProps = InputHTMLAttributes<HTMLInputElement> &
  FieldWrapperPassThroughProps

const Toggle = ({ label, ...other }: ToggleProps) => (
  <FieldWrapper label={label}>
    <div className="relative mr-2 inline-block w-10 select-none align-middle transition duration-200 ease-in">
      <input
        type="checkbox"
        name="toggle"
        id="toggle"
        className="toggle-checkbox absolute block h-6 w-6 cursor-pointer appearance-none rounded-full border-4 bg-white"
        {...other}
      />
      <label
        htmlFor="toggle"
        className="toggle-label block h-6 cursor-pointer overflow-hidden rounded-full bg-gray-300"
      ></label>
    </div>
  </FieldWrapper>
)

export default Toggle
