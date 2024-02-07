'use client'

'use client'

import { useSelectedProjectStore } from "@/store/selected-project-state"
import { ChatAlt2Icon, ClipboardListIcon, CodeIcon, TemplateIcon, UserGroupIcon } from "@heroicons/react/solid"
import Link from "next/link"
import React from "react"

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

export default function ProjectNavigationBar() {
  const { selectedProjectId } = useSelectedProjectStore()

  if (!selectedProjectId) return null

  return (
    <>
      {items.map((item, index) => (
        <Link key={index} href={item.href} className="flex items-center justify-center gap-2 py-5">
          <item.icon className="size-5" />
          <p>{item.name}</p>
        </Link>
      ))}
    </>
  )
}