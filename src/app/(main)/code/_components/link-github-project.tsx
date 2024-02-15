import { LinkGithubRepoForm } from '@/components/forms/link-github-repo-form'
import { getCurrentUser } from '@/lib/auth'
import { RiGithubFill } from '@remixicon/react'
import { Text, Title } from '@tremor/react'

const getReposOfUser = async (username: string) => {
  const response = await fetch(`https://api.github.com/users/${username}/repos`)
  const data = await response.json()
  return data ? data : []
}

export const LinkGithubProject = async () => {
  const user = await getCurrentUser()
  if (!user) return null
  const repos = await getReposOfUser(user.user_metadata.user_name)

  return (
    <div className="flex h-[calc(100%-160px)] w-full items-center justify-center">
      <div className="rounded-tremor-default border-tremor-content-subtle dark:border-dark-tremor-content-subtle flex flex-col items-center gap-2 border border-dashed p-8">
        <RiGithubFill className='size-16' color="black" />
        <Title className="">Aucun dépôt GitHub</Title>
        <Text>Aucun dépôt GitHub n&apos;est associé à ce projet.</Text>
        <LinkGithubRepoForm repos={repos} />
      </div>
    </div>
  )
}
