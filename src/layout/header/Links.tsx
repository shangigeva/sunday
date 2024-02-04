import React from "react";
import { useSelector } from "react-redux";
import { isAdminHeader, loggedInLinks, loggedOutLinks } from "../myLinksHeader";
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
    <div className="navbar-center  lg:flex">
      <ul className="menu menu-horizontal px-1">
        {/* regular user */}
        {loggedIn && !userData?.payload.isAdmin
          ? loggedInLinks.map((myItem, index) => (
              <li key={index}>
                <Link to={myItem.to}>{myItem.children}</Link>
              </li>
            ))
          : null}
        {/* admin user */}
        {loggedIn && userData?.payload.isAdmin
          ? isAdminHeader.map((myItem, index) => (
              <li key={index}>
                <Link to={myItem.to}>{myItem.children}</Link>
              </li>
            ))
          : null}
        {/* loggedOut */}
        {!loggedIn &&
          loggedOutLinks.map((myItem, index) => (
            <li key={index}>
              <Link to={myItem.to}>{myItem.children}</Link>
            </li>
          ))}
      </ul>
    </div>
  );
};
export default Links;
