"use client";

import { notFound } from "next/navigation";
import { toast } from "react-hot-toast";
import Loader from "../../../components/Loader";
import NotFoundText from "../../../components/NotFoundText";
import { trpc } from "../../../providers/trpcProvider";

const ProfilePage = () => {
  const { isLoading } = trpc.getAddress.useQuery(undefined, {
    refetchOnWindowFocus: false,
    onError: (err) => toast.error(err.message),
  });

  if (isLoading) {
    return <Loader />;
  }

  return <NotFoundText>Profile Page is in progress...</NotFoundText>;
};

export default ProfilePage;
