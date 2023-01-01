"use client";

import Button from "./Button";
import { IoArrowBackOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();

  return (
    <div className="ml-5 my-3">
      <Button onClick={() => router.back()} className="py-2 px-4" color="secondary">
        <IoArrowBackOutline className="text-xl mr-2" />
        Back
      </Button>
    </div>
  );
};

export default BackButton;
