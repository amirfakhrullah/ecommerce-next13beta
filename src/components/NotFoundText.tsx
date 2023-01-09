import React from "react";

const NotFoundText = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="h-[40vh] mx-auto max-w-6xl w-full flex flex-row items-center justify-center">
      <h2 className="my-10 font-black text-2xl text-zinc-400">
        {children ?? "Not Found."}
      </h2>
    </div>
  );
};

export default NotFoundText;
