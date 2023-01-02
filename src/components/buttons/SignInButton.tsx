"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Button from "./Button";

export const SignInButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    setIsLoading(true);
    await signIn("github");
  };

  return (
    <Button
      onClick={() => handleSignIn()}
      isLoading={isLoading}
      color="primary"
      className="py-2 px-6"
    >
      Login
    </Button>
  );
};
