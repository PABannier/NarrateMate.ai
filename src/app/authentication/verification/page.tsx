import * as React from "react";
import ButtonSignin from "@/components/button-signin";
import LogoHeader from "../login/components/logo-header";

export default function VerificationPage() {
  return (
    <div className="h-screen flex flex-col mx-auto max-w-[1200px] px-8 py-4">
      <LogoHeader />
      <div className="flex flex-col space-y-4 items-center justify-center h-full -mt-20">
        <h3 className="text-2xl">Verification required</h3>
        <p className="text-muted-foreground text-center">
          An email was sent to your address. Please verify your account before
          logging in.
        </p>
        <ButtonSignin text="Login" href="/authentication/login" />
      </div>
    </div>
  );
}
