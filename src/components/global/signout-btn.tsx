'use client'

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "@tremor/react";
import { useRouter } from "next/navigation";
import { ComponentProps } from "react";

type Props = ComponentProps<typeof Button>

export function SignOutBtn(props: Props) {
  const supabase = createClientComponentClient()
  const router = useRouter()

  async function signOut() {
    const { error } = await supabase.auth.signOut()

    if (error) console.error(error)
    // TODO: toast message

    router.refresh()
  }

  return (
    <Button {...props} onClick={signOut}>
      {props.children}
    </Button>
  )
}