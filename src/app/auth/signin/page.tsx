import { SignInBtnWithGithub } from "@/components/global/signin-btn-with-github";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default async function Page() {
  return (
    <main>
      <ThemeToggle />
      <h1>SignIn</h1>
      <SignInBtnWithGithub>Sign In with Github</SignInBtnWithGithub>
    </main>
  );
}
