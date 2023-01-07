import { SignInButton } from "./SignInButton";
import UserMenu from "../menus/UserMenu";
import { User } from "next-auth";

interface AuthButtonProps {
  user:
    | (User & {
        id: string;
      })
    | undefined;
}
const AuthButton = ({ user }: AuthButtonProps) => {
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
