import clsx from 'clsx'
import { InputHTMLAttributes } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

import { FieldWrapper, FieldWrapperPassThroughProps } from './FieldWrapper'
import { Units } from '@/collections/Quests/NumberInput/units'

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> &
  FieldWrapperPassThroughProps & {
    type?: 'text' | 'email' | 'password' | 'number'
    className?: string
    registration?: Partial<UseFormRegisterReturn>
    error?: any
    unit?: Units
  }

export const InputField = (props: InputFieldProps) => {
  const {
    type = 'text',
    label,
    className,
    registration,
    error,
    unit,
    ...other
  } = props
  return (
    <FieldWrapper label={label}>
      <input
        type={type}
        className={clsx(
          'focus:zinc-blue-500 block w-full appearance-none rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 placeholder-zinc-400 shadow-sm focus:border-zinc-500 focus:outline-none sm:text-sm',
          className,
        )}
        {...registration}
        {...other}
      />
      {unit?.valueOf() && unit.valueOf() != Units.None && (
        <span style={'margin-left:5px'}></span>
      )}
      {error?.message && (
        <small className="text-red-500">{error.message}</small>
      )}
    </FieldWrapper>
  )
}
