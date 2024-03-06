"use client";
import { Sidebar } from "@/components/sidebar";
import { UserNav } from "@/components/user-nav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="block font-inter">
      <div className="grid lg:grid-cols-5">
        <Sidebar className="hidden lg:block" />
        <div className="lg:col-span-4 lg:border-l">
          <div className="border-b">
            <div className="flex h-16 items-center px-4">
              <div className="ml-auto flex items-center space-x-4">
                <UserNav />
              </div>
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
