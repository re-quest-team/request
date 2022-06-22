import * as React from 'react'
import clsx from 'clsx'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean
  reversed?: boolean
}

export const EditorButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ type = 'button', className = '', ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={clsx(
          'flex items-center justify-center rounded-md border border-zinc-300 font-medium shadow-sm focus:outline-none disabled:cursor-not-allowed disabled:opacity-70',
          'bg-white text-zinc-900 hover:bg-zinc-200',
          'text-md py-2 px-6',
          className,
        )}
        {...props}
      >
        <span className="mx-2">{props.children}</span>
      </button>
    )
  },
)

EditorButton.displayName = 'Button'
