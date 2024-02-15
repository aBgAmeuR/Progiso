'use client'

import { getFormData } from '@abgameur/getformdata'
import { Button, SearchSelect, SearchSelectItem } from '@tremor/react'
import { useRouter } from 'next/navigation'

type Repo = {
  full_name: string
  name: string
}

type Props = {
  repos: Array<Repo>
}

export const LinkGithubRepoForm = ({ repos }: Props) => {
  const router = useRouter()

  const handleSubmit = async (formData: FormData) => {
    const data = getFormData(formData);
    if (!data.repo) return;
    
    const res = await fetch('/api/project/github', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ project_name: data.repo }),
    });

    if (!res.ok) {
      const error = await res.json();
      console.error(error);
      return;
    }

    router.refresh();
  };

  return (
    <form className='flex gap-2' action={handleSubmit}>
      <SearchSelect className="w-full" name='repo' placeholder='Sélectionner un dépôt'>
        {!Array.isArray(repos) || repos?.length <= 0 ? (
          <SearchSelectItem value={''}>Aucun dépôt trouvé</SearchSelectItem>
        ) : null}

        {Array.isArray(repos) && repos?.length > 0 ? repos.map((repo: Repo) => (
          <SearchSelectItem key={repo.full_name} value={repo.full_name}>
            {repo.name}
          </SearchSelectItem>
        )) : null}
      </SearchSelect>
      <Button type='submit' variant='primary'>Lier le dépôt</Button>
    </form>
  )
}
