import React from "react";
import UserHeadSection from "../../components/sections/UserHeadSection";

const UserPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto max-w-6xl w-full">
      <UserHeadSection />
      {children}
    </div>
  );
};

export default UserPageLayout;
