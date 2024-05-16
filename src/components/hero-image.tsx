'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';

import PlaceholderDark from '../../public/placeholder-dark.png';
import PlaceholderWhite from '../../public/placeholder-white.png';

const HeroImage = () => {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // When mounted on client, set to true
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const currentTheme = theme === 'system' ? systemTheme : theme;

  return (
    <Image
      className="size-full object-cover object-bottom"
      src={currentTheme === 'dark' ? PlaceholderDark : PlaceholderWhite}
      width={1904}
      height={992}
      alt="hero image"
    />
  );
};

export default HeroImage;
