import { Card } from '@tremor/react'
import React from 'react'

type Props = {
  selectedProjectId: string
}

export const TreeTab = ({ selectedProjectId }: Props) => {
  return (
    <Card className="size-full">
      <div>TreeTab</div>
    </Card>
  )
}
