import NavigationBar from "@/components/global/navigation";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Layout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  const user = await getCurrentUser();

  if (!user) redirect("/auth/signin");

  return (
    <div className="grid-cols-main-layout grid h-screen overflow-hidden">
      <NavigationBar />
      {children}
    </div>
  );
}
