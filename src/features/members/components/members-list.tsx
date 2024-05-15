import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { getProjectMembers } from '../services';
import { TMember } from '../types';
import { getRoleBadgeColor } from '../utils';

import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { UserAvatar } from '@/components/user-avatar';

type TMembersListProps = {
  className?: string;
};

export const MembersList = async ({ className }: TMembersListProps) => {
  const members = await getProjectMembers();
  if (!members) return null;

  return (
    <Card className={className}>
      <CardHeader className="bg-muted/20 p-4">
        <h2 className="text-lg font-semibold">Members</h2>
      </CardHeader>
      <Separator />
      <CardContent className="h-3/5 p-4">
        {members.slice(0, 5).map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </CardContent>
      <Separator />
      <CardFooter className="group flex justify-center divide-y p-4">
        <Link href="/team" className="flex items-center gap-2">
          <p className="text-primary font-semibold">View Team</p>
          <ArrowRight
            size={20}
            className="text-primary transition-transform delay-75 group-hover:translate-x-1"
          />
        </Link>
      </CardFooter>
    </Card>
  );
};

type TMemberCardProps = {
  member: TMember;
};

const MemberCard = ({ member }: TMemberCardProps) => {
  return (
    <div className="flex w-full items-center gap-3 py-2">
      <UserAvatar
        url={member.user.image}
        seed={member.user.name}
        className="size-8"
      />
      <p>{member.user.name}</p>
      <Badge className={getRoleBadgeColor(member.role)}>{member.role}</Badge>
    </div>
  );
};
