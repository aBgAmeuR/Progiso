import { cn } from '@/lib/utils'
import Image from 'next/image'
import { Text } from '@tremor/react'

const variantSize = {
  sm: 22,
  default: 40,
  lg: 64
} as const

type Props = {
  url: string
  alt?: string
  className?: string
  variant?: keyof typeof variantSize
}

export const Avatar = ({ url, alt, className, variant = 'default' }: Props) => {
  return (
    <Image
      src={url}
      alt={alt || 'Avatar'}
      className={cn('rounded-full', className)}
      width={variantSize[variant]}
      height={variantSize[variant]}
    />
  )
}

type AvatarGroupProps = {
  avatars: Array<{ url: string; alt: string }>
  max?: number
}

export const AvatarGroup = ({ avatars, max = 3 }: AvatarGroupProps) => {
  return (
    <div className="flex -space-x-2">
      {avatars.slice(0, max).map((avatar) => (
        <Avatar
          key={avatar.alt}
          url={avatar.url}
          alt={avatar.alt}
          variant='sm'
          className='dark:ring-dark-tremor-background size-[22px] ring-2 ring-white'
        />
      ))}
      {avatars.length > max && (
        <div className="dark:ring-dark-tremor-background dark:bg-dark-tremor-background-subtle bg-tremor-background-subtle flex size-6 items-center justify-center rounded-full ring-2 ring-white">
          <Text>+{avatars.length - max}</Text>
        </div>
      )}
    </div>
  )
}