"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

export const SignInBtn = () => {
  return (
    <Button onClick={() => signIn("google", { callbackUrl: "/slack" })}>
      Sign In
    </Button>
  );
};
