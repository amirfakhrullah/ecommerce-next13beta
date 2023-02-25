import { notFound } from "next/navigation";
import React, { use } from "react";
import { isAdmin } from "../../lib/getCurrentUser";

const AdminPageLayout = ({ children }: { children: React.ReactNode }) => {
  const isUserAdmin = use(isAdmin());
  if (!isUserAdmin) return notFound();

  return <div className="mx-auto max-w-6xl w-full px-2">{children}</div>;
};

export default AdminPageLayout;
