"use client";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { updateUser } from "@/lib/database/user";
import { useStore } from "@/app/zustand";

export function ProfileDialog() {
  const storeName = useStore((state) => state.name);
  const storeEmail = useStore((state) => state.email);
  const mutateName = useStore((state) => state.updateName);
  const mutateEmail = useStore((state) => state.updateEmail);
  const isOauthAuthenticated = useStore((state) => state.oauth);

  const [name, setName] = useState(storeName);
  const [email, setEmail] = useState(storeEmail);

  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  useEffect(() => {
    setName(storeName);
    setEmail(storeEmail);
  }, [storeName, storeEmail]);

  const handleChangePassword = async () => {
    if (password !== passwordConfirmation) {
      toast.error("Passwords do not match");
    } else {
      const { error } = await updateUser({ password });
      if (error) {
        toast.error((error as Error).message);
      } else {
        toast.success("Password updated");
      }
    }
  };

  const handleSaveChanges = async () => {
    if (isOauthAuthenticated) {
      const { error } = await updateUser({ email, data: { full_name: name } });
      if (error) {
        toast.error((error as Error).message);
      } else {
        mutateName(name);
        mutateEmail(email);
        toast.success("Profile updated");
      }
    } else {
      const { error } = await updateUser({
        email,
        data: { display_name: name },
      });
      if (error) {
        toast.error((error as Error).message);
      } else {
        mutateName(name);
        mutateEmail(email);
        toast.success("Profile updated");
      }
    }
  };

  return (
    <DialogContent className="font-inter sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Edit profile</DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when you&apos;re done.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input
            id="name"
            value={name}
            placeholder="Your name"
            className="col-span-3"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Your email"
            value={email}
            className="col-span-3"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Change Password?</AccordionTrigger>
            <AccordionContent>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Password
                  </Label>
                  <Input
                    id="password"
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Confirm Password
                  </Label>
                  <Input
                    id="passwordConfirmation"
                    placeholder="Confirm Password"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    type="password"
                    className="col-span-3"
                  />
                </div>
                <div className="flex justify-end">
                  <Button type="submit" onClick={handleChangePassword}>
                    Change Password
                  </Button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <DialogFooter>
        <Button type="submit" onClick={handleSaveChanges}>
          Save changes
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
