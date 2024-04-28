'use client';

import React, { PropsWithChildren } from 'react';

import { TooltipProvider } from '@/components/ui/tooltip';

export const TooltipsProvider = ({ children }: PropsWithChildren) => {
  return <TooltipProvider delayDuration={10}>{children}</TooltipProvider>;
};
