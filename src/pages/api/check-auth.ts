import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import authOptions from "../../lib/authOptions";

const checkAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (session?.user) {
    return res.status(200).end();
  } else {
    return res.status(401).end();
  }
};

export default checkAuth;
