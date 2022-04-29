import clsx from 'clsx'
import { InputHTMLAttributes } from 'react'

import { FieldWrapper, FieldWrapperPassThroughProps } from './FieldWrapper'

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> &
  FieldWrapperPassThroughProps & {
    type?: 'text' | 'email' | 'password'
    className?: string
  }

export const InputField = (props: InputFieldProps) => {
  const { type = 'text', label, className, ...other } = props
  return (
    <FieldWrapper label={label}>
      <input
        type={type}
        className={clsx(
          'focus:zinc-blue-500 block w-full appearance-none rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 placeholder-zinc-400 shadow-sm focus:border-zinc-500 focus:outline-none sm:text-sm',
          className,
        )}
        {...other}
      />
    </FieldWrapper>
  )
}
