import { InputHTMLAttributes } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import {
  FieldWrapper,
  FieldWrapperPassThroughProps,
} from '../FormElements/FieldWrapper'

type ToggleProps = InputHTMLAttributes<HTMLInputElement> &
  FieldWrapperPassThroughProps & {
    registration?: Partial<UseFormRegisterReturn>
    error?: any
  }

const Toggle = ({ label, registration, error, ...other }: ToggleProps) => (
  <FieldWrapper label={label}>
    <div className="relative mr-2 inline-block w-10 select-none align-middle transition duration-200 ease-in">
      <input
        type="checkbox"
        name="toggle"
        id="toggle"
        className="toggle-checkbox absolute block h-6 w-6 cursor-pointer appearance-none rounded-full border-2 border-zinc-700 bg-zinc-800"
        {...registration}
        {...other}
      />
      <label
        htmlFor="toggle"
        className="toggle-label block h-6 cursor-pointer overflow-hidden rounded-full bg-zinc-700 checked:bg-red-500"
      ></label>
    </div>
    {error?.message && <small className="text-red-500">{error.message}</small>}
  </FieldWrapper>
)

export default Toggle
