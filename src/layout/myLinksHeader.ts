import ROUTES from "@/Routes/ROUTES";
import { Link } from "@/lib/types";
import React from "react";

const myLinks: Link[] = [
  { to: ROUTES.HOME, children: "Home page" },
  { to: ROUTES.REGISTER, children: "Register page" },
  { to: ROUTES.LOGIN, children: "Login page" },
  { to: ROUTES.TASKS, children: "Tasks" },
  { to: ROUTES.ABOUT, children: "About" },
];

// no user
const loggedOutLinks: Link[] = [
  { to: ROUTES.HOME, children: "Home page" },
  { to: ROUTES.REGISTER, children: "Sign up" },
  { to: ROUTES.LOGIN, children: "Login" },
  { to: ROUTES.ABOUT, children: "About" },
];
// regular user
const loggedInLinks: Link[] = [
  { to: ROUTES.TASKS, children: "Tasks" },
  { to: ROUTES.MYTASKS, children: "My Tasks" },
];
// admin user
const isAdminHeader: Link[] = [
  ...loggedInLinks,
  { to: ROUTES.USERSLIST, children: "Users List" },
];
export { myLinks, isAdminHeader, loggedInLinks, loggedOutLinks };

export default myLinks;
