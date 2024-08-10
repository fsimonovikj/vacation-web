import { createContext, useContext, useState } from "react";
import { UserViewModel } from "../../interfaces/types";
import { AuthModel } from "./AuthModels";
import * as authHelper from "./AuthServices";

type AuthContextProps = {
  auth: AuthModel | undefined;
  saveAuth: (auth: AuthModel) => void;
  user: UserViewModel | undefined;
  saveUser: (user: UserViewModel) => void;
};

const initAuthContext: AuthContextProps = {
  auth: authHelper.getAuth(),
  saveAuth: () => {},
  user: authHelper.getUser(),
  saveUser: () => {},
};

export const AuthContext = createContext<AuthContextProps>(initAuthContext);

const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<AuthModel | undefined>(authHelper.getAuth());
  const [user, setUser] = useState<UserViewModel | undefined>(
    authHelper.getUser()
  );

  const saveAuth = (auth: AuthModel) => {
    setAuth(auth);
    if (auth) {
      authHelper.setAuth(auth);
    } else {
      authHelper.removeAuth();
    }
  };

  const saveUser = (user: UserViewModel) => {
    setUser(user);
    if (user) {
      authHelper.setUser(user);
    } else {
      authHelper.removeUser();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        saveAuth,
        user,
        saveUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { useAuth, AuthProvider };
