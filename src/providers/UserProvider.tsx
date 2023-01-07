"use client";

import { User } from "next-auth";
import React, { createContext, useContext, useState } from "react";

export type UserSession =
  | (User & {
      id: string;
    })
  | undefined;

interface UserContextValues {
  user: UserSession;
  setUser: (user: UserSession) => void;
}
export const UserContext = createContext<UserContextValues>({
  user: undefined,
  setUser: () => {},
});

export const useUserContext = () => useContext(UserContext);

interface UserContextProviderProps {
  children: React.ReactNode;
  user: UserSession;
}

const UserContextProvider = ({ children, user }: UserContextProviderProps) => {
  const [userSession, setUserSession] = useState<UserSession>(user);

  return (
    <UserContext.Provider
      value={{
        user: userSession,
        setUser: setUserSession,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
