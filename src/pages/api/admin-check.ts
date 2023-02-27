import { UserType } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import db from "../../lib/servers/prismadb";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";

const checkAdmin = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    res.status(404).end();
  }
  const session = await getServerAuthSession({ req, res });

  if (!session || !session.user) {
    return res.status(400).end();
  }

  const { userType } = await db.user.findFirst({
    where: {
      id: session.user.id,
    },
    select: {
      userType: true,
    },
  }) || {};

  if (userType !== UserType.Admin) {
    return res.status(400).end();
  }
  return res.status(200).end();
};

export default checkAdmin;
