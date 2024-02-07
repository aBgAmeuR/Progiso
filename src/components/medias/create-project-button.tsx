'use client'

import { Button, Dialog, DialogPanel, Title } from "@tremor/react";
import React, { ComponentProps } from "react";

type Props = Omit<ComponentProps<typeof Button>, 'onClick'>

export function CreateProjectButton(props: Props) {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  return (
    <>
      <Button {...props} onClick={() => setIsOpen(true)}>
        {props.children}
      </Button>
      <Dialog open={isOpen} onClose={(val) => setIsOpen(val)} static={true}>
        <DialogPanel>
          <Title>Create a new project</Title>
          <Button onClick={() => setIsOpen(false)}>Close</Button>
        </DialogPanel>
      </Dialog>
    </>
  )
}