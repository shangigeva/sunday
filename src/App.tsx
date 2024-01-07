import { ToastContainer } from "react-toastify";
import Router from "./Routes/Router";
import LayoutComponent from "./layout/LayoutComponent";

const App = () => {
  return (
    <LayoutComponent>
      <ToastContainer />
      <Router />
    </LayoutComponent>
  );
};

export default App;
