import ROUTES from "./ROUTES";
import { Route, Routes } from "react-router";
import HomePage from "@/pages/homePage/HomePage";
import ErrorPage from "@/pages/ErrorPage/ErrorPage";
import AboutPage from "@/pages/aboutPage/AboutPage";
import ResiterAuthPage from "@/pages/registerPage/RegisterAuthPage";
import LoginAuthPage from "@/pages/loginPage/LoginAuthPage";
import Tasks from "@/pages/tasks/Tasks";
import UsersPage from "@/pages/usersPage/UsersPage";
import TaskDetailsPage from "@/pages/taskDetails/TaskDetailsPage";
import MyTasks from "@/pages/myTasksPage/MyTasksPage";
import ProfilePage from "@/pages/profilePage/ProfilePage";
import DashboardPage from "@/pages/dashboard/page";
const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.TASKS} element={<Tasks />} />
      <Route path={ROUTES.LOGIN} element={<LoginAuthPage />} />
      <Route path={ROUTES.REGISTER} element={<ResiterAuthPage />} />
      <Route path={ROUTES.ABOUT} element={<AboutPage />} />
      <Route path={ROUTES.USERSLIST} element={<UsersPage />} />
      <Route path={ROUTES.MYTASKS} element={<MyTasks />} />
      <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
      <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
      <Route path={`${ROUTES.TASKS}/:taskId`} element={<TaskDetailsPage />} />

      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default Router;
