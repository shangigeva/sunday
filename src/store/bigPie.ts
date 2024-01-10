import authSlice from "./authSlice";
import counterSlice from "./counterSlice";
import counterReducer from "./counterSlice";

import { configureStore } from "@reduxjs/toolkit";
export type RootStateType = {
  auth: ReturnType<typeof authSlice>;
  counterSlice: ReturnType<typeof counterReducer>;
};

const store = configureStore({
  reducer: {
    counterSlice,
    auth: authSlice,
  },
});

export default store;
