'use client';

import { icons } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

export type TNavbarItemProps = {
  iconName: keyof typeof icons;
  label: string;
  badge?: number;
  path: string;
  isSmall?: boolean;
};

export const LateralNavbarItem = ({
  iconName,
  label,
  badge,
  path,
  isSmall,
}: TNavbarItemProps) => {
  const pathName = usePathname();
  const isActive = pathName === path;
  const Icon = icons[iconName];

  if (isSmall) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href={path}>
            <Button
              variant="ghost"
              size="icon"
              className={cn('rounded-lg', isActive && 'bg-muted')}
              aria-label="Playground"
            >
              <Icon
                size={20}
                className={cn(
                  'text-muted-foreground',
                  isActive && 'text-primary'
                )}
              />
            </Button>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right" sideOffset={5}>
          {label}
        </TooltipContent>
      </Tooltip>
    );
  } else {
    return (
      <Link
        href={path}
        className={cn(
          'text-muted-foreground hover:text-primary flex items-center gap-3 rounded-lg p-2.5 transition-all',
          isActive && 'bg-muted text-primary'
        )}
      >
        <Icon size={20} />
        {<p>{label}</p>}
        {badge ? (
          <Badge className="ml-auto flex size-5 shrink-0 items-center justify-center rounded-full">
            {badge}
          </Badge>
        ) : null}
      </Link>
    );
  }
};
