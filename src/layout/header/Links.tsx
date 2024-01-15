import React from "react";
import { useSelector } from "react-redux";
import { isAdminHeader, loggedInLinks, loggedOutLinks } from "../myLinks";
import NavLinkComponent from "./NavLinkComponent";
import { RootStateType } from "@/store/bigPie";
import { Link } from "react-router-dom";

const Links: React.FC = () => {
  const loggedIn: boolean = useSelector(
    (bigPie: RootStateType) => bigPie.auth.loggedIn
  );
  const userData = useSelector((bigPie: RootStateType) => bigPie.auth.userData);
  console.log(userData?.payload.isAdmin);

  console.log(loggedIn);

  return (
    <>
      {/* regular user */}
      {loggedIn && !userData?.payload.isAdmin
        ? loggedInLinks.map((myItem, index) => (
            <NavLinkComponent to={myItem.to} key={index}>
              {myItem.children}
            </NavLinkComponent>
          ))
        : null}
      {/* admin user */}
      {loggedIn && userData?.payload.isAdmin
        ? isAdminHeader.map((myItem, index) => (
            <NavLinkComponent to={myItem.to} key={index}>
              {myItem.children}
            </NavLinkComponent>
          ))
        : null}
      {/* loggedOut */}
      {!loggedIn &&
        loggedOutLinks.map((myItem, index) => (
          <li>
            <Link to={myItem.to}>{myItem.children}</Link>
            {/* <NavLinkComponent to={myItem.to} key={index}></NavLinkComponent> */}
          </li>
        ))}
    </>
  );
};

export default Links;
