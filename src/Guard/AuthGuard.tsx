import ROUTES from "@/Routes/ROUTES";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const loggedIn: boolean = useSelector((bigPie: any) => bigPie.auth.loggedIn);

  if (loggedIn) {
    return children;
  } else {
    return <Navigate to={ROUTES.LOGIN} replace={true} />;
  }
};

export default AuthGuard;
