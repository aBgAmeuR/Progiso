import { TContributor } from './type';

export const getTimeAgo = (date: Date) => {
  const formatDate = new Date(date);
  const currentDate = new Date();
  const secondsAgo = Math.floor(
    (currentDate.getTime() - formatDate.getTime()) / 1000
  );

  const intervals = [
    { label: 'w', seconds: 604800 },
    { label: 'd', seconds: 86400 },
    { label: 'h', seconds: 3600 },
    { label: 'min', seconds: 60 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(secondsAgo / interval.seconds);
    if (count > 0) {
      return `${count}${interval.label} ago`;
    }
  }

  return 'now';
};

export const getProgressValue = (value1: number, value2: number) => {
  const sum = value1 + value2;
  return Math.round((value1 / sum) * 100);
};

export const getProgressContributorValue = (
  contributor: TContributor,
  contributors: TContributor[]
): number => {
  const firstContributor: TContributor = contributors[0];
  const coef = contributor.contributions / firstContributor.contributions;
  return coef * 100;
};
