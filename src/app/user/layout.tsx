import React from "react";
import UserHeadSection from "../../components/sections/UserHeadSection";
import UserTabs from "../../components/UserTabs";

const UserPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto max-w-6xl w-full">
      <UserHeadSection />
      <UserTabs />
      {children}
    </div>
  );
};

export default UserPageLayout;
