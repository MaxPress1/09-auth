"use client";

import { getMe } from "../../lib/api/clientApi";
import { useAuthStore } from "../../lib/store/authStore";
import { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore((state) => state.clearIsAuthenticated);
  const [loading, setLoading] = useState(true);

  useEffect(() => { 
    const fetchSession = async () => {  
      try {
        const user = await getMe();
        if (user) {
          setUser(user);
        } else {
          clearIsAuthenticated();
        }
      } catch {
        clearIsAuthenticated();
      } finally {
        setLoading(false);
      }
    };
    fetchSession();
  }, [clearIsAuthenticated, setUser]);

  if (loading) return <div>Loading...</div>;

  return children;
};

export default AuthProvider;
