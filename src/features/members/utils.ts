import { TMember } from './types';

const roleColors = {
  OWNER: 'bg-purple-500 hover:bg-purple-400',
  ADMIN: 'bg-red-500 hover:bg-red-400',
  DEVELOPPER: 'bg-green-500 hover:bg-green-400',
} as const;

type RoleColors = typeof roleColors;
type Role = keyof RoleColors;

export function getRoleBadgeColor(
  role: TMember['role']
): RoleColors[Role] | 'blue-500 hover:bg-blue-600' {
  return (
    (roleColors as { [key: string]: RoleColors[Role] })[role] ||
    'bg-blue-500 hover:bg-blue-600'
  );
}
