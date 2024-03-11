import LoadingNavigationBar from "@/components/global/loading-navigation";
import NavigationBar from "@/components/global/navigation";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function Layout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <div className="grid-cols-main-layout grid h-screen ">
      <Suspense fallback={<LoadingNavigationBar />}>
        <NavigationBar />
      </Suspense>
      {children}
    </div>
  );
}
