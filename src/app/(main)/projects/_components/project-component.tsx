'use client'

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
        <div className="flex -space-x-2">
          {project.members.slice(0, 3).map((member) => (
            <Image
              key={member.user.id}
              className="dark:ring-dark-tremor-background size-[22px] rounded-full ring-2 ring-white"
              src={member.user.avatar_url}
              alt={member.user.user_name}
              width={22}
              height={22}
            />
          ))}
          {project.members.length > 3 && (
            <div className="dark:ring-dark-tremor-background dark:bg-dark-tremor-background-subtle bg-tremor-background-subtle flex size-6 items-center justify-center rounded-full ring-2 ring-white">
              <Text>+{project.members.length - 3}</Text>
            </div>
          )}
        </div>
        <div>
          <Button onClick={handleViewProject} icon={ArrowRightIcon} iconPosition="right" variant="light">Y aller</Button>
        </div>
      </div>

    </Card>
  );
}
