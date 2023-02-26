"use client";

import React, { createContext, useContext, useState } from "react";
import { UserSession } from "../types/types";

interface UserContextValues {
  user: UserSession;
  setUser: (user: UserSession) => void;
  isAdmin: boolean;
}
export const UserContext = createContext<UserContextValues>({
  user: undefined,
  setUser: () => {},
  isAdmin: false,
});

export const useUserContext = () => useContext(UserContext);

interface UserContextProviderProps {
  children: React.ReactNode;
  user: UserSession;
  isAdmin: boolean;
}

const UserContextProvider = ({
  children,
  user,
  isAdmin,
}: UserContextProviderProps) => {
  const [userSession, setUserSession] = useState<UserSession>(user);

  return (
    <UserContext.Provider
      value={{
        user: userSession,
        setUser: setUserSession,
        isAdmin,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
