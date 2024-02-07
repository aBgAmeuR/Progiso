'use client'

import { Button } from "@tremor/react";
import { ComponentProps } from "react";

type Props = ComponentProps<typeof Button>

export function TempCreateProject(props: Props) {

  async function createProject() {
    const res = await fetch('/api/project', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: 'New Project', description: 'A new project' })
    })

    const json = await res.json()
    console.log(json)
  }

  return (
    <Button {...props} onClick={createProject}>
      {props.children}
    </Button>
  )
}