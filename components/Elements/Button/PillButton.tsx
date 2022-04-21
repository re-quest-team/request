import clsx from 'clsx'
import * as React from 'react'

import { Spinner } from '@/components/Elements/Spinner'

const variants = {
  primary: 'bg-re-blue text-re-blue border-re-blue hover:bg-opacity-30',
  secondary: 'bg-re-orange text-re-orange border-re-orange hover:bg-opacity-30',
}

const sizes = {
  sm: 'py-2 px-1 text-sm',
  md: 'py-2 px-2 text-md',
  lg: 'py-3 px-3',
}

type IconProps =
  | { startIcon: React.ReactElement; endIcon?: never }
  | { endIcon: React.ReactElement; startIcon?: never }
  | { endIcon?: undefined; startIcon?: undefined }

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
  isLoading?: boolean
} & IconProps

export const PillButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      type = 'button',
      className = '',
      variant = 'primary',
      size = 'md',
      isLoading = false,
      startIcon,
      endIcon,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={clsx(
          'flex items-center justify-center rounded-full border bg-opacity-20 text-sm font-semibold shadow-sm focus:outline-none disabled:cursor-not-allowed disabled:opacity-70',
          variants[variant],
          sizes[size],
          className,
        )}
        {...props}
      >
        {isLoading && <Spinner size="sm" className="text-current" />}
        {!isLoading && startIcon}
        <span className="mx-2">{props.children}</span> {!isLoading && endIcon}
      </button>
    )
  },
)

PillButton.displayName = 'Button'