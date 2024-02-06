'use client'

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "@tremor/react";
import { useRouter } from "next/navigation";
import { ComponentProps } from "react";

type Props = ComponentProps<typeof Button>

export function SignInBtnWithGithub(props: Props) {
  const supabase = createClientComponentClient()

  async function signInWithGithub() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        queryParams: {
          
        },
        redirectTo: `${location.origin}/auth/callback`,
      }
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