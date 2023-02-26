"use client";

import { SignInButton } from "./SignInButton";
import UserMenu from "../menus/UserMenu";
import { useUserContext } from "../../providers/UserProvider";

const AuthButton = () => {
  const { user, isAdmin } = useUserContext();

  if (!user) {
    return <SignInButton />;
  }

  return (
    <div className="flex flex-row items-center justify-center">
      <UserMenu user={user} isAdmin={isAdmin} />
    </div>
  );
};

export default AuthButton;
