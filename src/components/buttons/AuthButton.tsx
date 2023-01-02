import { SignInButton } from "./SignInButton";
import { getCurrentUser } from "../../lib/session";
import UserMenu from "../UserMenu";

const AuthButton = async () => {
  const user = await getCurrentUser();

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
