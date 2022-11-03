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
    unit?: string
  }

export const SubtleInputField = (props: InputFieldProps) => {
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
          'block w-full appearance-none rounded-md bg-stone-800 px-6 py-4 placeholder-zinc-400 shadow-sm outline-none',
          className,
        )}
        {...registration}
        {...other}
      />
      {error?.message && (
        <small className="text-red-500">{error.message}</small>
      )}
    </FieldWrapper>
  )
}
