import React from "react";

const AdminPageLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="mx-auto max-w-6xl w-full px-2">{children}</div>;
};

export default AdminPageLayout;
