import React from "react";
import { useSelector } from "react-redux";
import { isAdminHeader, loggedInLinks, loggedOutLinks } from "../myLinks";
import NavLinkComponent from "./NavLinkComponent";
import { RootStateType } from "@/store/bigPie";

const Links: React.FC = () => {
  const loggedIn: boolean = useSelector(
    (bigPie: RootStateType) => bigPie.auth.loggedIn
  );
  const userData = useSelector((bigPie: RootStateType) => bigPie.auth.userData);
  console.log(userData?.payload.isAdmin);

  console.log(loggedIn);

  return (
    <div>
      <div>
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
            <NavLinkComponent to={myItem.to} key={index}>
              {myItem.children}
            </NavLinkComponent>
          ))}
      </div>
    </div>
  );
};

export default Links;
