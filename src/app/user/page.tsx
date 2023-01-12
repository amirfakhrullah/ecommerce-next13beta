"use client";

import { useState } from "react";
import OrderHistorySection from "../../components/sections/UserSection/OrderHistorySection";
import AboutSection from "../../components/sections/UserSection/AboutSection";
import UserTabs from "../../components/UserTabs";

const ProfilePage = () => {
  const [tab, setTab] = useState(0);

  const CurrentDisplay = () => {
    switch (tab) {
      case 0:
        return <OrderHistorySection />;
      case 1:
        return <AboutSection />;
      default:
        return <></>;
    }
  };

  return (
    <>
      <UserTabs tab={tab} setTab={setTab} />
      <CurrentDisplay />
    </>
  );
};

export default ProfilePage;
