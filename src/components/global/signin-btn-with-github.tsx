'use client'

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "@tremor/react";
import { ComponentProps } from "react";

type Props = ComponentProps<typeof Button>

export function SignInBtnWithGithub(props: Props) {
  const supabase = createClientComponentClient()

  async function signInWithGithub() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
        scopes: 'read:public_key',
      },
    })

    if (error) console.error(error)
    // TODO: toast message
  }

  return (
    <Button {...props} onClick={signInWithGithub}>
      {props.children}
    </Button>
  )
}