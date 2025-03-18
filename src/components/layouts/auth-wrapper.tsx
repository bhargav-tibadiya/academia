// Packages
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

// Configs & Utils
import { ROUTES } from "@/utils/constants/routes";

const AuthWrapper = () => {
  // Hooks
  const token = sessionStorage.getItem("token")

  let isValid = false;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);

      if (decoded.exp && decoded.exp > currentTime) {
        isValid = true;
      } else {
        sessionStorage.removeItem("token");
      }
    } catch (error) {
      console.error("Invalid token:", error);
      sessionStorage.removeItem("token");
    }
  }

  return (
    isValid ? <Outlet /> : <Navigate to={ROUTES.LOGIN} />
  )
}

export default AuthWrapper