// Packages
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode, JwtPayload } from "jwt-decode";

// Configs & Utils
import { ROUTES } from "../../utils/constants/routes";

// Types
interface TokenType extends JwtPayload {
  id: string;
  role: string;
  email: string;
  userId: string;
}


const AdminWrapper = () => {
  // Hooks
  const token = sessionStorage.getItem("token")

  let isValid = false;

  if (token) {
    try {
      const decoded: TokenType = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);

      if (decoded.exp && decoded.exp > currentTime && decoded.role === "admin") {
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

export default AdminWrapper