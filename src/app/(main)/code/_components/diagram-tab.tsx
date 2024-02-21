import { Card } from '@tremor/react'
import React from 'react'

type Props = {
  selectedProjectId: string
}

export const DiagramTab = ({ selectedProjectId }: Props) => {
  return (
    <Card className="size-full">
      <div>DiagramTab</div>
    </Card>
  )
}
