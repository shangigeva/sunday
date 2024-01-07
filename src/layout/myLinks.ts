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
  { to: ROUTES.HOME, children: "Home page" },
  { to: ROUTES.ABOUT, children: "About" },
];

// admin user

export { myLinks, loggedInLinks, loggedOutLinks };

export default myLinks;
