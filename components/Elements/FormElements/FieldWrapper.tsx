import clsx from 'clsx'
import * as React from 'react'

type FieldWrapperProps = {
  label?: string
  className?: string
  children: React.ReactNode
}

export type FieldWrapperPassThroughProps = Omit<
  FieldWrapperProps,
  'className' | 'children'
>

export const FieldWrapper = (props: FieldWrapperProps) => {
  const { label, className, children } = props
  return (
    <div className="mt-2 mb-4">
      <label className={clsx('block text-sm font-medium', className)}>
        {label}
        <div className="mt-1">{children}</div>
      </label>
    </div>
  )
}
