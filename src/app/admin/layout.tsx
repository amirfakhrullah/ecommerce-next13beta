import { UserType } from "@prisma/client";
import { notFound } from "next/navigation";
import React from "react";
import db from "../../lib/servers/prismadb";
import { getCurrentUser } from "../../lib/servers/session";

const AdminPageLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getCurrentUser();
  if (!user) return notFound();

  const { userType } =
    (await db.user.findFirst({
      where: {
        id: user.id,
      },
      select: {
        userType: true,
      },
    })) || {};

  if (userType !== UserType.Admin) return notFound();

  return <div className="mx-auto max-w-6xl w-full px-2">{children}</div>;
};

export default AdminPageLayout;
