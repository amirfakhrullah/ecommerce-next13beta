"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const AuthError = () => {
  const params = useSearchParams();
  const [isNotified, setIsNotified] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout
    if (params.get("error") && params.get("callbackUrl") && !isNotified) {
      setIsNotified(true);
      timeout = setTimeout(() => {
        if (params.get("error") === "OAuthAccountNotLinked") {
          toast.error("The email is linked to different provider");
        } else {
          toast.error(params.get("error"));
        }
      }, 100);
    }
    return () => clearTimeout(timeout)
  }, []);

  return <></>;
};

export default AuthError;
