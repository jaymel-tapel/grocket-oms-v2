import { createContext, useContext, useState } from "react";
import { UserLocalInfo, getUserInfo } from "../utils/utils";

export type UserAuthContext = {
  user: UserLocalInfo | undefined;
  setUser: React.Dispatch<React.SetStateAction<UserLocalInfo | undefined>>;
};

export const UserAuthContext = createContext<UserAuthContext>({
  user: getUserInfo(),
  setUser: () => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export const useUserAuthContext = () => useContext(UserAuthContext);

export const UserAuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(getUserInfo());

  return (
    <UserAuthContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};
