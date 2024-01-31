import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { authActions } from "../store/authSlice";
import { getToken } from "@/service/storageService";
import { IJWTPayload } from "@/lib/types";
export interface UserData {
  payload: IJWTPayload;
  iat: number;
  exp: number;
}

const useAutoLogin = () => {
  const dispatch = useDispatch();

  return async (skipTokenTest: boolean = false): Promise<void> => {
    try {
      const token: string | null = getToken();

      if (!token) return;
      const dataFromToken: UserData = jwtDecode(token) as UserData;

      if (skipTokenTest) {
        await axios
          .get(`/users/${dataFromToken.payload._id}`)
          .then((response) => console.log("Server response:", response))
          .catch((error) => console.error("Server error:", error));
      }
      console.log("Data from token after server call:", dataFromToken);

      dispatch(authActions.login(dataFromToken));
    } catch (err) {
      console.log("err from auto login", err);
      localStorage.clear();
    }
  };
};

export default useAutoLogin;
