"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";

interface IProfileDialogProps {
  originalName: string;
  originalEmail: string;
}

export function ProfileDialog({
  originalName,
  originalEmail,
}: IProfileDialogProps) {
  const [name, setName] = useState(originalName);
  const [email, setEmail] = useState(originalEmail);
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  useEffect(() => {
    setName(originalName);
    setEmail(originalEmail);
  }, [originalName, originalEmail]);

  return (
    <DialogContent className="font-inter sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Edit profile</DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when you're done.
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
            Password confirmation
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
      </div>
      <DialogFooter>
        <Button type="submit">Save changes</Button>
      </DialogFooter>
    </DialogContent>
  );
}
