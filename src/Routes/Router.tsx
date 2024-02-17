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
import AuthGuard from "@/Guard/AuthGuard";
import AdminGuard from "@/Guard/AdminGuard";
import NoGuard from "@/Guard/NoGuard";
const Router = () => {
  return (
    <Routes>
      <Route
        path={ROUTES.HOME}
        element={
          <NoGuard>
            <HomePage />
          </NoGuard>
        }
      />
      <Route
        path={ROUTES.TASKS}
        element={
          <AuthGuard>
            <Tasks />
          </AuthGuard>
        }
      />
      <Route
        path={ROUTES.LOGIN}
        element={
          <NoGuard>
            <LoginAuthPage />
          </NoGuard>
        }
      />
      <Route
        path={ROUTES.REGISTER}
        element={
          <NoGuard>
            <ResiterAuthPage />
          </NoGuard>
        }
      />
      <Route path={ROUTES.ABOUT} element={<AboutPage />} />
      <Route
        path={ROUTES.USERSLIST}
        element={
          <AuthGuard>
            <AdminGuard>
              <UsersPage />
            </AdminGuard>
          </AuthGuard>
        }
      />
      <Route
        path={ROUTES.MYTASKS}
        element={
          <AuthGuard>
            <MyTasks />
          </AuthGuard>
        }
      />
      <Route
        path={ROUTES.PROFILE}
        element={
          <AuthGuard>
            <ProfilePage />
          </AuthGuard>
        }
      />
      <Route
        path={ROUTES.DASHBOARD}
        element={
          <AuthGuard>
            <DashboardPage />
          </AuthGuard>
        }
      />
      <Route
        path={`${ROUTES.TASKS}/:taskId`}
        element={
          <AuthGuard>
            <TaskDetailsPage />
          </AuthGuard>
        }
      />

      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default Router;
