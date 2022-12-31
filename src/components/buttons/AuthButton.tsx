import React from "react";
import { SignInButton, SignOutButton } from "./AuthClientButtons";
import { getCurrentUser } from "../../lib/session";

const AuthButton = async () => {
  const user = await getCurrentUser();

  return <div>{!user ? <SignInButton /> : <SignOutButton />}</div>;
};

export default AuthButton;
