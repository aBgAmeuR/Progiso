import { BarList, Title } from '@tremor/react';
import { getContributorsOfProject } from '@/lib/github';
import { Avatar } from '@/components/ui/avatar';

type Props = {
  project_url: string
}

export const MoreInfo = async ({ project_url }: Props) => {
  const contributors = await getContributorsOfProject(project_url);
  const sortedContributors = Array.isArray(contributors) ? contributors.sort((a: any, b: any) => b.contributions - a.contributions) : [];
  const topContributors = sortedContributors.slice(0, 4);
  const barlistData = topContributors.map((contributor: any) => {
    return {
      name: contributor.login,
      value: contributor.contributions,
      icon: function Icon() {
        return <Avatar url={contributor.avatar_url} variant='sm' className='mr-1' />;
      }
    };
  });

  return (
    <div className='grid grid-cols-2 gap-5'>
      <div>
        <Title>Résumé du projet</Title>
      </div>
      <div>
        <Title>Meilleurs contributeurs</Title>
        <BarList
          data={barlistData}
          className='pt-1'
        />
      </div>
    </div>
  )
}
