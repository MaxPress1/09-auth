"use client";

import { getMe } from "../../lib/api/clientApi";
import { useAuth } from "../../lib/store/authStore";
import { useEffect } from "react";
import { checkSession } from "../../lib/api/serverApi";

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const setUser = useAuth((state) => state.setUser);
  const clearIsAuthenticated = useAuth((state) => state.clearIsAuthenticated);

  useEffect(() => {
    const fetchSession = async () => {
      const isAuth = await checkSession();
      if (isAuth) {
        const user = await getMe();
        setUser(user);
      } else {
        clearIsAuthenticated();
      }
    };
    fetchSession();
  }, [clearIsAuthenticated, setUser]);

  return children;
};

export default AuthProvider;
