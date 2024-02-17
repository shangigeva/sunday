import ROUTES from "@/Routes/ROUTES";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const NoGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const loggedIn: boolean = useSelector((bigPie: any) => bigPie.auth.loggedIn);
  if (!loggedIn) {
    return children;
  } else {
    return <Navigate to={ROUTES.TASKS} replace={true} />;
  }
};

export default NoGuard;
