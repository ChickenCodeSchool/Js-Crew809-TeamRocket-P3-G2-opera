import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Navigate, useOutletContext } from "react-router-dom";
import type { Auth } from "../App";

type ProtectedRouteProps = {
  children: ReactNode;
};

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { auth, setAuth } = useOutletContext<{
    auth: Auth | null;
    setAuth: (auth: Auth | null) => void;
  }>();
  const [checking, setChecking] = useState(true); // avoid flashing the page before auth check

  useEffect(() => {
    const checkSession = async () => {
      if (auth) {
        setChecking(false); // already authenticated in memory
        return;
      }

      try {
        const response = await fetch("http://localhost:3310/auth/session", {
          credentials: "include", // send auth cookie to validate session
        });

        if (response.ok) {
          const data = (await response.json()) as { user: Auth["user"] };
          setAuth({ user: data.user, token: "" }); // keep token empty since cookie stores it
        }
      } finally {
        setChecking(false); // done checking, allow navigation decision
      }
    };

    checkSession();
  }, [auth, setAuth]);

  if (checking) {
    return <div>Chargement...</div>;
  }

  if (!auth) {
    return <Navigate to="/auth" replace />; // redirect unauthenticated users
  }

  return <>{children}</>;
}

export default ProtectedRoute;