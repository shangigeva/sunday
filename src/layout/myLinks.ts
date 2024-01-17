import ROUTES from "@/Routes/ROUTES";
import React from "react";

type Link = {
  to: string;
  children: string;
};

const myLinks: Link[] = [
  { to: ROUTES.HOME, children: "Home page" },
  { to: ROUTES.REGISTER, children: "Register page" },
  { to: ROUTES.LOGIN, children: "Login page" },
  { to: ROUTES.ABOUT, children: "About" },
  { to: ROUTES.TASKS, children: "Tasks" },
];
// admin user
const isAdminHeader: Link[] = [
  { to: ROUTES.ABOUT, children: "About" },
  { to: ROUTES.TASKS, children: "Tasks" },
  { to: ROUTES.USERSLIST, children: "User List" },
];
// no user
const loggedOutLinks: Link[] = [
  { to: ROUTES.HOME, children: "Home page" },
  { to: ROUTES.REGISTER, children: "Sign up" },
  { to: ROUTES.LOGIN, children: "Login" },
];
// regular user
const loggedInLinks: Link[] = [
  { to: ROUTES.ABOUT, children: "About" },
  { to: ROUTES.TASKS, children: "Tasks" },
  { to: ROUTES.MYTASKS, children: "My Tasks" },
];

export { myLinks, isAdminHeader, loggedInLinks, loggedOutLinks };

export default myLinks;
