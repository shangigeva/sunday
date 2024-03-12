import React from "react";
import { useSelector } from "react-redux";
import { RootStateType } from "@/store/bigPie";
import { Link } from "react-router-dom";
import {
  isAdminFooter,
  loggedInLinksFooter,
  loggedOutLinksFooter,
} from "../myLinksFooter";

const LinksFooter: React.FC = () => {
  const loggedIn: boolean = useSelector(
    (bigPie: RootStateType) => bigPie.auth.loggedIn
  );
  const userData = useSelector((bigPie: RootStateType) => bigPie.auth.userData);
  console.log(userData?.payload.isAdmin);

  console.log(loggedIn);

  return (
    <div className="navbar-center">
      <ul className="menu menu-horizontal px-1 flex-col">
        {/* regular user */}
        {loggedIn && !userData?.payload.isAdmin
          ? loggedInLinksFooter.map((myItem, index) => (
              <li key={index} className="flex text-black">
                <Link to={myItem.to}>{myItem.children}</Link>
              </li>
            ))
          : null}
        {/* admin user */}
        {loggedIn && userData?.payload.isAdmin
          ? isAdminFooter.map((myItem, index) => (
              <li key={index} className="flex text-black">
                <Link to={myItem.to}>{myItem.children}</Link>
              </li>
            ))
          : null}
        {/* loggedOut */}
        {!loggedIn &&
          loggedOutLinksFooter.map((myItem, index) => (
            <li key={index} className="flex text-black">
              <Link to={myItem.to}>{myItem.children}</Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default LinksFooter;
