"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export const SignOutBtn = () => {
  return <Button onClick={() => signOut()}>Sign Out</Button>;
};