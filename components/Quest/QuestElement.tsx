import clsx from 'clsx'
import { Icon } from 'react-feather'

const variants = {
  primary: 'border-dodger-blue bg-dodger-blue text-dodger-blue',
  secondary: 'border-flamingo bg-flamingo text-flamingo',
}

type QuestElementProps = {
  title: string
  description: string
  icon: ((props: React.ComponentProps<'svg'>) => JSX.Element) | Icon
  variant?: keyof typeof variants
  onClick?: () => any
}

const QuestElement = ({
  title,
  description,
  icon,
  variant = 'primary',
  onClick,
}: QuestElementProps) => {
  const ElementIcon = icon
  return (
    <div
      className="my-4 flex cursor-pointer content-center items-center rounded-xl bg-zinc-800 p-2 shadow hover:bg-zinc-700 hover:shadow-xl"
      onClick={onClick}
    >
      <div
        className={clsx(
          'm-2 mr-4 flex h-16 w-16 items-center justify-center rounded-xl border bg-opacity-20',
          variants[variant],
        )}
      >
        <ElementIcon className="h-8 w-8" />
      </div>
      <div className="flex-1">
        <p className="font-semibold">{title}</p>
        <p className="text-zinc-300">{description}</p>
      </div>
    </div>
  )
}

export default QuestElement
