"use client";

import * as React from "react";
import { LoginCard } from "./components/login-card";
import LogoHeader from "./components/logo-header";

export default function LoginPage() {
  return (
    <div className="h-screen flex flex-col mx-auto max-w-[1200px] px-8 py-4">
      <LogoHeader />
      <div className="flex items-center justify-center h-full">
        <LoginCard />
      </div>
    </div>
  );
}
