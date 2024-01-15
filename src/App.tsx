import { ToastContainer } from "react-toastify";
import Router from "./Routes/Router";
import LayoutComponent from "./layout/LayoutComponent";
import { useEffect, useState } from "react";
import useAutoLogin from "./hooks/useAutoLogin";

const App = () => {
  const [doneAuth, setDoneAuth] = useState(false);
  const autoLogin = useAutoLogin();
  useEffect(() => {
    console.log("trying to catch user");

    (async () => {
      try {
        await autoLogin();
      } catch (err) {
        console.log(err);
      } finally {
        setDoneAuth(true);
      }
    })();
  }, []);
  return (
    <LayoutComponent>
      <ToastContainer />
      <Router />
    </LayoutComponent>
  );
};

export default App;
