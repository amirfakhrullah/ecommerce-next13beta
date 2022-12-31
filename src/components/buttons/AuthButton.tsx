import React from "react";
import Button from "./Button";
import { signIn } from "next-auth/react";

const AuthButton = () => {
  return (
    <Button onClick={() => signIn()} color="primary" className="px-4 py-2">
      Login
    </Button>
  );
};

export default AuthButton;
