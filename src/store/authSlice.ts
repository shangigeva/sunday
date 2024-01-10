import { UserData } from "@/hooks/useAutoLogin";
import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  loggedIn: boolean;
  userData: UserData | undefined;
}

const initialState: AuthState = {
  loggedIn: false,
  userData: undefined,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.loggedIn = true;
      state.userData = action.payload;
    },
    logout(state) {
      state.loggedIn = false;
      state.userData = undefined;
    },
  },
});

//export the set functions for the components to make use of the actions
export const authActions = authSlice.actions;

//in reducer we have all the necessary data to connect with the big pie
export default authSlice.reducer;
