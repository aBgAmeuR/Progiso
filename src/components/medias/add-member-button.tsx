'use client'

import { Button, Dialog, DialogPanel, Title } from "@tremor/react";
import React, { ComponentProps } from "react";


type buttonProps = Omit<ComponentProps<typeof Button>, 'onClick'>

interface Props extends buttonProps {
  projectname: string
}

export const AddMemberButton = (props: Props) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  return (
    <>
      <Button {...props} onClick={() => setIsOpen(true)}>
        {props.children}
      </Button>
      <Dialog open={isOpen} onClose={(val) => setIsOpen(val)} static={true}>
        <DialogPanel>
          <Title>Ajouter un membre a {props.projectname}</Title>
          <Button className="mt-8 w-full" onClick={() => setIsOpen(false)}>Close</Button>
        </DialogPanel>
      </Dialog>
    </>
  )
}