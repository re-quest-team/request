import { Button } from '@/components/Elements/Button'
import { Spacer } from '@/components/Elements/Spacer'
import type { NextPage } from 'next'
import { ArrowRightIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import Panel from '@/components/Panel'

const Studio: NextPage = () => {
  return (
    <div>
      <h1 className="p-2 text-center text-6xl font-bold">Studio</h1>
      <Panel type="room">
        <Panel type="quest">
          <div>Nested Panel</div>
        </Panel>
      </Panel>
      <Panel>
        <span>Lorem ipsum</span>
      </Panel>
    </div>
  )
}

export default Studio
