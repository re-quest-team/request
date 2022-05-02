import clsx from 'clsx'
import * as React from 'react'

import { Spinner } from '@/components/Elements/Spinner'

const variants = {
  primary: 'bg-dodger-blue text-dodger-blue border-dodger-blue',
  secondary: 'bg-flamingo text-flamingo border-flamingo',
  tertiary: 'bg-emerald-500 text-emerald-500 border-emerald-500',
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
          'flex items-center justify-center rounded-full border bg-opacity-20 text-sm font-semibold shadow-sm hover:bg-opacity-30 focus:outline-none disabled:cursor-not-allowed disabled:opacity-70',
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
