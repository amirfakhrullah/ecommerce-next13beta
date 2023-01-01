import { SignInButton, SignOutButton } from "./AuthClientButtons";
import { getCurrentUser } from "../../lib/session";
import Image from "next/image";

const AuthButton = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return <SignInButton />;
  }

  return (
    <div className="flex flex-row items-center justify-center">
      {user.image && (
        <div className="rounded-full overflow-hidden mr-2">
          <Image src={user.image} alt="user-image" height={35} width={35} />
        </div>
      )}
      <SignOutButton />
    </div>
  );
};

export default AuthButton;
