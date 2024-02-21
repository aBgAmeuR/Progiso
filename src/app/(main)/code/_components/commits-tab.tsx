import { Project } from '@/lib/project'
import { Card, Divider } from '@tremor/react'
import React, { Suspense } from 'react'
import { Overview } from './commit-tab/overview'
import { MoreInfo } from './commit-tab/more-info'
import { OverviewLoading } from './commit-tab/overview-loading'
import { MoreInfoLoading } from './commit-tab/more-info-loading'

type Props = {
  selectedProject: Project
}

export const CommitsTab = ({ selectedProject }: Props) => {
  if (!selectedProject.github_repo_url) return null
  const project_url = selectedProject.github_repo_url

  return (
    <Card className="size-full">
      <Suspense fallback={<OverviewLoading />}>
        <Overview project_url={project_url} />
      </Suspense>
      <Divider>
        Plus d&apos;informations
      </Divider>
      <Suspense fallback={<MoreInfoLoading />}>
        <MoreInfo project_url={project_url} />
      </Suspense>
    </Card>
  )
}
