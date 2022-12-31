"use client";

import React from "react";
import { signIn, signOut } from "next-auth/react";
import Button from "./Button";

export const SignInButton = () => {
  return (
    <Button
      onClick={() => signIn("github")}
      color="primary"
      className="px-4 py-2"
    >
      Login
    </Button>
  );
};

export const SignOutButton = () => {
  return (
    <Button onClick={() => signOut()} color="primary" className="px-4 py-2">
      Logout
    </Button>
  );
};
