import clsx from 'clsx'

type FeatureCardProps = {
  title: string
  color: string
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element
  children: React.ReactElement
}

const FeatureCard = ({ title, color, icon, children }: FeatureCardProps) => {
  const Icon = icon

  return (
    <div className="p-8 sm:basis-1/2 lg:basis-1/3">
      <div className="rounded-lg bg-zinc-900 p-8 shadow">
        <div className="mb-2 flex w-full items-center justify-between">
          <span className="text-lg font-semibold">{title}</span>
          <span className={clsx('rounded-full p-2', color)}>
            <Icon className="h-5 w-5" />
          </span>
        </div>
        <div>{children}</div>
      </div>
    </div>
  )
}

export default FeatureCard
