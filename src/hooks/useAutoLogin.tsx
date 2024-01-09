import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { authActions } from "../store/authSlice";
import { getToken } from "@/service/storageService";
interface UserData {
  _id: string;
}
const useAutoLogin = () => {
  const dispatch = useDispatch();
  return async (skipTokenTest: boolean = false): Promise<void> => {
    try {
      const token: string | null = getToken();
      if (!token) return;
      const dataFromToken: UserData = jwtDecode(token) as UserData;
      if (skipTokenTest) await axios.get(`/users/${dataFromToken._id}`);

      dispatch(authActions.login(dataFromToken));
    } catch (err) {
      console.log("err from auto login", err);
      localStorage.clear();
    }
  };
};

export default useAutoLogin;
