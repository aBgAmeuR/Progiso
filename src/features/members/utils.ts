import { TMember } from './types';

const roleColors = {
  OWNER: 'red-500',
  DEV: 'green-500',
} as const;

type RoleColors = typeof roleColors;
type Role = keyof RoleColors;

export function getRoleBadgeColor(
  role: TMember['role']
): RoleColors[Role] | 'blue-500' {
  return (
    (roleColors as { [key: string]: RoleColors[Role] })[role] || 'blue-500'
  );
}
