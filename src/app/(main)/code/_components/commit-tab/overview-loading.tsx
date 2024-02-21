import { Skeleton } from '@/components/ui/skeleton';
import { CheckCircleIcon, PlusCircleIcon } from '@heroicons/react/solid';
import { RiGitMergeFill, RiGitPullRequestFill } from "@remixicon/react";
import { Card, ProgressBar, Text, Title } from '@tremor/react';

export const OverviewLoading = async () => {

  return (
    <Card className='h-2/5 divide-y p-0'>
      <div className='bg-tremor-background-muted dark:bg-dark-tremor-background-muted flex h-1/5 items-center px-4'>
        <h1 className='text-base font-semibold'>Aperçu</h1>
      </div>
      <div className='flex h-2/5 items-center justify-between'>
        <div className='flex w-1/2 flex-col gap-1 px-5'>
          <ProgressBar value={0} />
          <div className='flex items-center gap-1'>
            <Skeleton className='h-4 w-6' />
            <Text className='text-sm'>pull requests actifs</Text>
          </div>
        </div>
        <div className='flex w-1/2 flex-col gap-1 px-5'>
          <ProgressBar value={0} />
          <div className='flex items-center gap-1'>
            <Skeleton className='h-4 w-6' />
            <Text className='text-sm'>issues actives</Text>
          </div>
        </div>
      </div>
      <div className='grid h-2/5 grid-cols-4 divide-x'>
        <div className='flex flex-col items-center justify-center gap-1'>
          <div className='flex items-center gap-1'>
            <RiGitPullRequestFill size={19} className='fill-blue-400' />
            <Skeleton className='h-5 w-6' />
          </div>
          <Text className='text-base'>Pull ouvert</Text>
        </div>
        <div className='flex flex-col items-center justify-center gap-1'>
          <div className='flex items-center gap-1'>
            <RiGitMergeFill size={19} className='fill-blue-200' />
            <Skeleton className='h-5 w-6' />
          </div>
          <Text className='text-base'>Pull fermé</Text>
        </div>
        <div className='flex flex-col items-center justify-center gap-1'>
          <div className='flex items-center gap-1'>
            <PlusCircleIcon className='size-[19px] fill-blue-400' />
            <Skeleton className='h-5 w-6' />
          </div>
          <Text className='text-base'>Issue ouverte</Text>
        </div>
        <div className='flex flex-col items-center justify-center gap-1'>
          <div className='flex items-center gap-1'>
            <CheckCircleIcon className='size-[19px] fill-blue-200' />
            <Skeleton className='h-5 w-6' />
          </div>
          <Text className='text-base'>Issue fermée</Text>
        </div>
      </div>
    </Card>
  )
}
