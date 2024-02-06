import { UserIcon, ViewGridIcon } from "@heroicons/react/solid"
import Image from "next/image"
import Link from "next/link"
import ProjectNavigationBar from "./project-nav"

export default function NavigationBar() {
  return (
    <nav className="bg-tremor-background-muted dark:bg-dark-tremor-background-muted flex h-screen flex-col justify-between">
      <div>
        <div className="flex items-center justify-center gap-2 py-8">
          <Image src="/logo.svg" alt="Progiso" width={27} height={27} />
          <h1>Progiso</h1>
        </div>
        <ProjectNavigationBar />
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