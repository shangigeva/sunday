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
const loggedOutLinksFooter: Link[] = [
  { to: ROUTES.HOME, children: "Home page" },
  { to: ROUTES.ABOUT, children: "About" },
];
// regular user
const loggedInLinksFooter: Link[] = [
  { to: ROUTES.TASKS, children: "Tasks" },
  { to: ROUTES.MYTASKS, children: "My Tasks" },
  { to: ROUTES.ABOUT, children: "About" },
];
// admin user
const isAdminFooter: Link[] = [...loggedInLinksFooter];
export { myLinks, isAdminFooter, loggedInLinksFooter, loggedOutLinksFooter };

export default myLinks;
