"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const AuthError = () => {
  const params = useSearchParams();
  const router = useRouter();
  const currentPath = usePathname();
  const [isNotified, setIsNotified] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (params.get("error") && params.get("callbackUrl") && !isNotified) {
      setIsNotified(true);
      timeout = setTimeout(() => {
        if (params.get("error") === "OAuthAccountNotLinked") {
          toast.error("The email is linked to different provider");
        } else {
          toast.error(params.get("error"));
        }
      }, 100);
      router.push(currentPath);
    }
    return () => clearTimeout(timeout);
  }, []);

  return <></>;
};

export default AuthError;
