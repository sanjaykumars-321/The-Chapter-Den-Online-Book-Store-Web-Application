import { useEffect } from "react";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useUser } from "../features/Auth/useUser";

function ProtectedRouteLogin({ children }) {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated } = useUser();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate("/home", { replace: true });
    }
  }, [isLoading, isAuthenticated, navigate]);

  if (isLoading) return <Spinner />;
  if (!isAuthenticated) return children;
}

export default ProtectedRouteLogin;
