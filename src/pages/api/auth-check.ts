import { NextApiRequest, NextApiResponse } from "next";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";

const checkAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    res.status(404).end();
  }
  const session = await getServerAuthSession({ req, res });

  if (session && session.user) {
    res.status(200).end();
  } else {
    res.status(400).end();
  }
};

export default checkAuth;
