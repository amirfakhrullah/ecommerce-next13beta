import { unstable_getServerSession } from "next-auth/next"
import authOptions from "./authOptions"

export const getSession = async () => {
  return await unstable_getServerSession(authOptions)
}

export const getCurrentUser = async () => {
  const session = await getSession()

  return session?.user
}
