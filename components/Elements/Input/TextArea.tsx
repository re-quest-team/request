import clsx from 'clsx'
import React from 'react'

import { FieldWrapper, FieldWrapperPassThroughProps } from './FieldWrapper'

type TextAreaProps = FieldWrapperPassThroughProps &
  React.TextareaHTMLAttributes<HTMLTextAreaElement>

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, className, ...props }: TextAreaProps) => {
    return (
      <FieldWrapper label={label}>
        <textarea
          className={clsx(
            'focus:zinc-blue-500 block w-full appearance-none rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 placeholder-zinc-400 shadow-sm focus:border-zinc-500 focus:outline-none sm:text-sm',
            className,
          )}
          {...props}
        />
      </FieldWrapper>
    )
  },
)

TextArea.displayName = 'TextArea'
