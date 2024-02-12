import { getSelectedProject } from "@/lib/project";
import { ChatAlt2Icon, ClipboardListIcon, CodeIcon, TemplateIcon, UserGroupIcon, UserIcon, ViewGridIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

type Item = {
  name: string
  href: string
  icon: React.FC<React.SVGProps<SVGSVGElement>>
}

const items: ReadonlyArray<Item> = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: TemplateIcon,
  },
  {
    name: 'Taches',
    href: '/tasks',
    icon: ClipboardListIcon,
  },
  {
    name: 'Messagerie',
    href: '/messages',
    icon: ChatAlt2Icon,
  },
  {
    name: 'Code',
    href: '/code',
    icon: CodeIcon,
  },
  {
    name: 'Equipe',
    href: '/team',
    icon: UserGroupIcon,
  },
]

export default async function NavigationBar() {
  const selectedProject = await getSelectedProject();

  return (
    <nav className="bg-tremor-background-muted dark:bg-dark-tremor-background-muted flex h-screen flex-col justify-between">
      <div>
        <div className="flex items-center justify-center gap-2 py-8">
          <Image src="/logo.svg" alt="Progiso" width={27} height={27} />
          <h1>Progiso</h1>
        </div>

        {selectedProject ? items.map((item, index) => (
          <Link key={index} href={item.href} className="flex items-center justify-center gap-2 py-5">
            <item.icon className="size-5" />
            <p>{item.name}</p>
          </Link>
        )) : null}
      </div>

      <div className="bottom-0 pb-2">
        <Link href="/projects" className="flex items-center justify-center gap-2 py-5">
          <ViewGridIcon className="size-5" />
          <p>Projets</p>
        </Link>

        <Link href="/account" className="flex items-center justify-center gap-2 py-5">
          <UserIcon className="size-5" />
          <p>Compte</p>
        </Link>
      </div>
    </nav >
  )
}