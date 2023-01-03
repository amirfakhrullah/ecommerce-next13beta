import NextAuth from "next-auth";
import authOptions from "../../../lib/servers/authOptions";

export default NextAuth(authOptions);
