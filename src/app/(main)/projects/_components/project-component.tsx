'use client'

import { Avatar, AvatarGroup } from "@/components/ui/avatar";
import { setSelectProject } from "@/lib/project";
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "@heroicons/react/solid";
import { Button, Card, Text, Title } from "@tremor/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Props = {
  id: string;
  name: string;
  image_url: string | null;
  members: Array<any>;
};

export default function ProjectComponent(project: Props) {
  const router = useRouter();

  const handleViewProject = async () => {
    await setSelectProject(project.id);
    router.push("/dashboard");
  };

  return (
    <Card className="group p-4">
      <div className={cn("rounded-tremor-default border-tremor-content-subtle dark:border-dark-tremor-content-subtle mb-2 h-20 border border-dashed", project.image_url ? "relative" : "bg-tremor-background-muted dark:bg-dark-tremor-background-muted")}>
        {project.image_url && (
          <Image
            src={project.image_url}
            alt={project.name}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            className="rounded-tremor-default"
          />
        )}
      </div>
      <Title className="my-2">{project.name}</Title>

      <div className="flex justify-between">
        <AvatarGroup avatars={project.members.map((member) => ({ url: member.user.avatar_url, alt: member.user.user_name }))} />
        <div>
          <Button onClick={handleViewProject} icon={ArrowRightIcon} iconPosition="right" variant="light">Y aller</Button>
        </div>
      </div>

    </Card>
  );
}
