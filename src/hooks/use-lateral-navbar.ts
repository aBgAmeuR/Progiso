import { useEffect, useState } from 'react';

export const useLateralNavBar = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  useEffect(() => {
    const isExpanded = localStorage.getItem('isExpanded') === 'true';
    setIsExpanded(isExpanded);
  }, []);
  useEffect(() => {
    localStorage.setItem('isExpanded', String(isExpanded));
  }, [isExpanded]);

  return { isExpanded, setIsExpanded };
};
