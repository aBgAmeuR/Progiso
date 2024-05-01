import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

const avatarStackVariants = cva('flex', {
  variants: {
    orientation: {
      vertical: 'flex-row',
      horizontal: 'flex-col',
    },
    spacing: {
      sm: '-space-x-5 -space-y-5',
      md: '-space-x-4 -space-y-4',
      lg: '-space-x-3 -space-y-3',
      xl: '-space-x-2 -space-y-2',
    },
    size: {
      sm: 'w-6 h-6 text-xs',
      md: 'w-8 h-8 text-sm',
      lg: 'w-10 h-10 text-base',
      xl: 'w-12 h-12 text-lg',
    },
  },
  defaultVariants: {
    orientation: 'vertical',
    spacing: 'md',
  },
});

type TAvatar = {
  name: string | null;
  image: string | null;
};

export interface AvatarStackProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarStackVariants> {
  avatars: TAvatar[];
  avatarsOffset?: number;
  maxAvatarsAmount?: number;
}

function AvatarStack({
  className,
  orientation,
  avatars,
  spacing,
  size,
  // avatarsOffset = 2,
  maxAvatarsAmount = 4,
  ...props
}: AvatarStackProps) {
  const limitedAvatars = avatars.slice(0, maxAvatarsAmount);

  return (
    <div
      className={cn(
        avatarStackVariants({ orientation, spacing }),
        className,
        orientation === 'horizontal' ? '-space-x-0' : '-space-y-0'
      )}
      {...props}
    >
      {limitedAvatars.map((avatar, index) => (
        <Tooltip key={index}>
          <TooltipTrigger>
            <Avatar className={avatarStackVariants({ size })}>
              <AvatarImage src={avatar.image!} />
              <AvatarFallback>?</AvatarFallback>
            </Avatar>
          </TooltipTrigger>
          <TooltipContent>
            <p>{avatar.name}</p>
          </TooltipContent>
        </Tooltip>
      ))}
      {limitedAvatars.length < avatars.length ? (
        <Avatar
          key={'Excesive avatars'}
          className={avatarStackVariants({ size })}
        >
          <AvatarFallback>
            +{avatars.length - limitedAvatars.length}
          </AvatarFallback>
        </Avatar>
      ) : null}
    </div>
  );
}

export { AvatarStack, avatarStackVariants };
