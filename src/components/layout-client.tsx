"use client";

import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout = ({ children }: ClientLayoutProps) => {
  return (
    <SessionProvider>
      {children}
      <Toaster
        toastOptions={{ duration: 3000 }}
        containerClassName="font-inter"
      />
    </SessionProvider>
  );
};

export default ClientLayout;
