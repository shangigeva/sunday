import ROUTES from "@/Routes/ROUTES";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminGuard = ({ children }: { children: React.ReactNode }) => {
  const userData = useSelector((bigPie: any) => bigPie.auth.userData);
  if (userData && userData.payload.isAdmin) {
    return children;
  } else {
    return <Navigate to={ROUTES.TASKS} replace={true} />;
  }
};
export default AdminGuard;
