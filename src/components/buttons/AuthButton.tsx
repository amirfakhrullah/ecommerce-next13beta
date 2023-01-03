import { SignInButton } from "./SignInButton";
import { getCurrentUser } from "../../lib/servers/session";
import UserMenu from "../menus/UserMenu";
import { use } from "react";

const AuthButton = () => {
  const user = use(getCurrentUser());

  if (!user) {
    return <SignInButton />;
  }

  return (
    <div className="flex flex-row items-center justify-center">
      <UserMenu user={user} />
    </div>
  );
};

export default AuthButton;
