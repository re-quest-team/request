import clsx from 'clsx'
import React from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

import { FieldWrapper, FieldWrapperPassThroughProps } from './FieldWrapper'

type TextAreaProps = FieldWrapperPassThroughProps &
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    registration?: Partial<UseFormRegisterReturn>
    error?: any
  }

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, className, registration, error, ...props }: TextAreaProps) => {
    return (
      <FieldWrapper label={label}>
        <textarea
          className={clsx(
            'focus:zinc-blue-500 block w-full appearance-none rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 placeholder-zinc-400 shadow-sm focus:border-zinc-500 focus:outline-none sm:text-sm',
            className,
          )}
          {...registration}
          {...props}
        />
        {error?.message && (
          <small className="text-red-500">{error.message}</small>
        )}
      </FieldWrapper>
    )
  },
)

TextArea.displayName = 'TextArea'
