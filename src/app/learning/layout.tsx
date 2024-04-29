import { Sidebar } from "@/components/sidebar";
import { UserNav } from "@/components/user-nav";
import { Suspense } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="block h-screen ">
      <div className="grid grid-cols-1 lg:grid-cols-5">
        <Sidebar className="hidden lg:block" />
        <div className="lg:col-span-4 lg:border-l">
          <div className="border-b">
            <div className="flex h-16 items-center px-4">
              <div className="ml-auto flex items-center space-x-4">
                <UserNav />
              </div>
            </div>
          </div>
          <Suspense>{children}</Suspense>
        </div>
      </div>
    </div>
  );
}
