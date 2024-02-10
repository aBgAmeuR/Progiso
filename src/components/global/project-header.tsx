import { Title } from "@tremor/react"
import { PropsWithChildren } from "react"

type Props = PropsWithChildren<{
  projectName: string
  title?: string
}>

export const ProjectHeader = async ({ projectName, title, children }: Props) => {

  return (
    <header className="flex flex-col gap-2">
      <div className="flex h-11 justify-between">
        <h1 className=" text-4xl font-bold text-neutral-800 dark:text-neutral-200">
          {projectName}
        </h1>
        <div className="flex gap-2">
          {children}
        </div>
      </div>
      <Title className="text-tremor-content dark:text-dark-tremor-content">{title}</Title>
    </header>
  )
}
