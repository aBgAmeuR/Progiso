import { SignInBtnWithGithub } from "@/components/global/signin-btn-with-github";
import { SignOutBtn } from "@/components/global/signout-btn";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { getCurrentSession, getCurrentUser } from "@/lib/auth";

export default async function Home() {
  const user = await getCurrentUser();
  const session = await getCurrentSession();

  return (
    <>
      <ThemeToggle />
      <h1>Welcome {user?.user_metadata.user_name}</h1>
      {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
      <pre>{JSON.stringify(session, null, 2)}</pre>
      {user ? <SignOutBtn>Sign Out</SignOutBtn> : <SignInBtnWithGithub>Sign In with Github</SignInBtnWithGithub>}
    </>
  );
}
