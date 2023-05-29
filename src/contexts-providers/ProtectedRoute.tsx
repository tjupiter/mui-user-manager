import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
//
import { useUserAuth } from "./UserAuthContext";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user } = useUserAuth();
  if (!user) {
    return <Navigate to='/' />;
  }

  return <>{children}</>;
}
