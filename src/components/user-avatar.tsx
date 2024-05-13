import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const getFallBack = (seed?: string | null) => {
  if (!seed) return null;

  const uppercaseLetters = seed.match(/[A-Z]/g) || [];

  return uppercaseLetters.length >= 2
    ? `${uppercaseLetters[0]}${uppercaseLetters[1]}`
    : seed.slice(0, 2).toLocaleUpperCase();
};

type TUserAvatarProps = {
  url?: string | null;
  seed?: string | null;
  className?: string;
};

export const UserAvatar = ({ url, seed, className }: TUserAvatarProps) => {
  const fallback = getFallBack(seed);

  return (
    <Avatar className={className}>
      {url && seed ? (
        <AvatarImage src={url} />
      ) : (
        <AvatarImage
          src={`https://api.dicebear.com/8.x/shapes/svg?seed=${seed}`}
        />
      )}
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
};
