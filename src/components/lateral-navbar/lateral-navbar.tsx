'use client';

import { motion } from 'framer-motion';
import { ArrowLeftFromLine } from 'lucide-react';

import { Button } from '../ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { LateralNavbarItem, TNavbarItemProps } from './lateral-navbar-item';

import { useLateralNavBar } from '@/hooks/use-lateral-navbar';
import { useMediaQuery } from '@/hooks/use-media-query';
import { cn } from '@/lib/utils';

const items: Array<TNavbarItemProps> = [
  { iconName: 'Home', label: 'Dashboard', path: '/board' },
  { iconName: 'ListTodo', label: 'Tasks', path: '/tasks' },
  { iconName: 'Mails', label: 'Messages', path: '/messages', badge: 6 },
  { iconName: 'GitBranch', label: 'Repository', path: '/repo' },
  { iconName: 'UsersRound', label: 'Team', path: '/team' },
];

export const LateralNavbar = () => {
  const { isExpanded, setIsExpanded } = useLateralNavBar();
  const isTablet = useMediaQuery('(max-width: 1024px)');
  // const isMobile = useMediaQuery('(max-width: 768px)');
  const collapsedWidth = isTablet ? '3.5rem' : '4.5rem';
  const expandedWidth = isTablet ? '10.75rem' : '12rem';

  const sideVariants = {
    collapsed: {
      width: collapsedWidth,
    },
    expanded: {
      width: expandedWidth,
    },
  };

  return (
    <aside className="bg-muted/40  block border-r">
      <motion.div
        className="flex h-full flex-col gap-2 overflow-hidden"
        initial={false}
        animate={isExpanded ? 'collapsed' : 'expanded'}
        variants={sideVariants}
      >
        <div className="flex-1 py-4">
          <nav className="grid items-start gap-2 px-2 text-sm font-medium lg:px-4">
            {items.map((item, index) => (
              <LateralNavbarItem key={index} {...item} isSmall={isExpanded} />
            ))}
          </nav>
        </div>
        <div className="mt-auto flex justify-end px-2 pb-4 lg:px-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-muted rounded-lg"
                aria-label="Playground"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                <ArrowLeftFromLine
                  size={24}
                  className={cn(
                    'text-muted-foreground rotate-0 transition-all duration-300',
                    isExpanded && 'rotate-180'
                  )}
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              {isExpanded ? 'Expand' : 'Collapse'}
            </TooltipContent>
          </Tooltip>
        </div>
      </motion.div>
    </aside>
  );
};
