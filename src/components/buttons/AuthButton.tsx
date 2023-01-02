import { SignInButton, SignOutButton } from "./AuthClientButtons";
import { getCurrentUser } from "../../lib/session";
import UserAvatar from "../Avatar";
import cn from "../../helpers/cn";

const AuthButton = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return <SignInButton />;
  }

  return (
    <div className="flex flex-row items-center justify-center">
      <div
        className={cn(
          "rounded-full h-8 w-8 flex flex-row items-center justify-center overflow-hidden mr-2",
          !user.image && "bg-purple-400"
        )}
      >
        <UserAvatar
          user={user}
          fallbackProps={{
            delayMs: 600,
          }}
        />
      </div>
      <SignOutButton />
    </div>
  );
};

export default AuthButton;
