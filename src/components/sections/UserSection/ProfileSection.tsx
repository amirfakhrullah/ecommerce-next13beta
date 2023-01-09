"use client";

import { toast } from "react-hot-toast";
import { trpc } from "../../../providers/trpcProvider";
import Loader from "../../loaders/Loader";
import NotFoundText from "../../NotFoundText";

const ProfileSection = () => {
  const { isLoading } = trpc.getAddress.useQuery(undefined, {
    refetchOnWindowFocus: false,
    onError: (err) => toast.error(err.message),
  });

  if (isLoading) {
    return <Loader />;
  }

  return <NotFoundText>Profile Section is in development</NotFoundText>;
};

export default ProfileSection;
