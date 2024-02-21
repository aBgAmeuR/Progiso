import { getIssuesOfProject, getPullsOfProject } from '@/lib/github';
import { CheckCircleIcon, PlusCircleIcon } from '@heroicons/react/solid';
import { RiGitMergeFill, RiGitPullRequestFill } from "@remixicon/react";
import { Card, ProgressBar, Text, Title } from '@tremor/react';

type Prpos = {
  project_url: string
}

export const Overview = async ({ project_url }: Prpos) => {
  const pullRequests = await getPullsOfProject(project_url)
  const issues = await getIssuesOfProject(project_url)

  const nbOpenPulls = Array.isArray(pullRequests) ? pullRequests.filter((pull: any) => pull.state === 'open').length : 0
  const nbClosedPulls = Array.isArray(pullRequests) ? pullRequests.filter((pull: any) => pull.state === 'closed').length : 0
  const nbOpenIssues = Array.isArray(issues) ? issues.filter((issue: any) => issue.state === 'open').length : 0
  const nbClosedIssues = Array.isArray(issues) ? issues.filter((issue: any) => issue.state === 'closed').length : 0

  return (
    <Card className='h-2/5 divide-y p-0'>
      <div className='bg-tremor-background-muted dark:bg-dark-tremor-background-muted flex h-1/5 items-center px-4'>
        <h1 className='text-base font-semibold'>Aperçu</h1>
      </div>
      <div className='flex h-2/5 items-center justify-between'>
        <div className='flex w-1/2 flex-col gap-1 px-5'>
          <ProgressBar value={nbOpenPulls / (nbOpenPulls + nbClosedPulls) * 100} />
          <Text className='text-sm'><strong>{nbOpenPulls}</strong> pull requests actifs</Text>
        </div>
        <div className='flex w-1/2 flex-col gap-1 px-5'>
          <ProgressBar value={nbOpenIssues / (nbOpenIssues + nbClosedIssues) * 100} />
          <Text className='text-sm'><strong>{nbOpenIssues}</strong> issues actives</Text>
        </div>
      </div>
      <div className='grid h-2/5 grid-cols-4 divide-x'>
        <div className='flex flex-col items-center justify-center gap-1'>
          <div className='flex items-center gap-1'>
            <RiGitPullRequestFill size={19} className='fill-blue-400' />
            <Title>{nbOpenPulls}</Title>
          </div>
          <Text className='text-base'>Pull ouvert</Text>
        </div>
        <div className='flex flex-col items-center justify-center gap-1'>
          <div className='flex items-center gap-1'>
            <RiGitMergeFill size={19} className='fill-blue-200' />
            <Title>{nbClosedPulls}</Title>
          </div>
          <Text className='text-base'>Pull fermé</Text>
        </div>
        <div className='flex flex-col items-center justify-center gap-1'>
          <div className='flex items-center gap-1'>
            <PlusCircleIcon className='size-[19px] fill-blue-400' />
            <Title>{nbOpenIssues}</Title>
          </div>
          <Text className='text-base'>Issue ouverte</Text>
        </div>
        <div className='flex flex-col items-center justify-center gap-1'>
          <div className='flex items-center gap-1'>
            <CheckCircleIcon className='size-[19px] fill-blue-200' />
            <Title>{nbClosedIssues}</Title>
          </div>
          <Text className='text-base'>Issue fermée</Text>
        </div>
      </div>
    </Card>
  )
}
