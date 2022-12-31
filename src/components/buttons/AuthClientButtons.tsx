"use client";

import React, { useState } from "react";
import { signIn, signOut } from "next-auth/react";
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
      className="px-4 py-2"
    >
      Login
    </Button>
  );
};

export const SignOutButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    await signOut();
  };

  return (
    <Button
      onClick={() => handleSignOut()}
      isLoading={isLoading}
      color="primary"
      className="px-4 py-2"
    >
      Logout
    </Button>
  );
};
