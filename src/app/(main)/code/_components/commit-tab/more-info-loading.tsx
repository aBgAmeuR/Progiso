import { Skeleton } from '@/components/ui/skeleton';
import { BarList, Title } from '@tremor/react';

const data = [
  {
    name: "",
    value: 10,
  },
  {
    name: "",
    value: 7,
  },
  {
    name: "",
    value: 4,
  },
  {
    name: "",
    value: 2,
  }
];

export const MoreInfoLoading = async () => {
  return (
    <div className='grid grid-cols-2 gap-5'>
      <div>
        <Title>Résumé du projet</Title>
      </div>
      <div>
        <Title>Meilleurs contributeurs</Title>
        <BarList
          data={data}
          className='pt-1'
        />
      </div>
    </div>
  )
}
