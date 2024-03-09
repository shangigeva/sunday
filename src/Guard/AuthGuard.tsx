import ROUTES from "@/Routes/ROUTES";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

function isTokenExpired(token: any) {
  const currentTime = Date.now(); // Current time in milliseconds
  const { exp } = token;

  return currentTime >= exp * 1000;
}

const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const userData = useSelector((bigPie: any) => bigPie.auth.userData);
  if (userData && isTokenExpired(userData)) {
    localStorage.removeItem("token");
    window.location.reload();
  }
  const loggedIn: boolean = useSelector((bigPie: any) => bigPie.auth.loggedIn);
  if (loggedIn) {
    return children;
  } else {
    return <Navigate to={ROUTES.LOGIN} replace={true} />;
  }
};

export default AuthGuard;
