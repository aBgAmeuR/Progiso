'use client'

import { Button, Dialog, DialogPanel, Divider, Metric, Title } from "@tremor/react";
import React, { ComponentProps } from "react";
import SearchGitHubProfiles from "../ui/search-gitHub-profiles";
import { PlusCircleIcon } from "@heroicons/react/solid";
import { AdminMembersList } from "@/app/(main)/team/_components/admin-members-list";
import { Member } from "@/app/(main)/team/_components/admin-button";


type buttonProps = Omit<ComponentProps<typeof Button>, 'onClick'>

interface Props extends buttonProps {
  projectname: string
  access_token?: string | null
  members: Array<Member>
}

export const AddMemberButton = (props: Props) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);


  return (
    <>
      <Button {...props} onClick={() => setIsOpen(true)}>
        {props.children}
      </Button>
      <Dialog open={isOpen} onClose={(val) => setIsOpen(val)} static={true}>
        <DialogPanel className="overflow-visible">
          <Metric>Ajouter un membre</Metric>
          <form className="mt-4 flex gap-2">
            <SearchGitHubProfiles access_token={props.access_token} />
            <Button onClick={() => setIsOpen(false)}>
              <div className="flex gap-2">
                Ajouter
                <PlusCircleIcon className='size-5' />
              </div>
            </Button>
          </form>
          <Divider />
          <AdminMembersList members={props.members} />
        </DialogPanel>
      </Dialog>
    </>
  )
}