import React from "react";
import { useSelector } from "react-redux";
import { isAdminHeader, loggedInLinks } from "../myLinks";
import NavLinkComponent from "./NavLinkComponent";

interface AuthState {
  loggedIn: boolean;
  userData: {
    isAdmin: boolean;
  };
}

const Links: React.FC = () => {
  const loggedIn = useSelector(
    (bigPie: { auth: AuthState }) => bigPie.auth.loggedIn
  );
  const userData = useSelector(
    (bigPie: { auth: AuthState }) => bigPie.auth.userData
  );

  return (
    <div>
      <div>
        {" "}
        {/* loggedOut */}
        {/* {!loggedIn &&
          loggedOutLinks.map((myItem, index) => (
            <NavLinkComponent to={myItem.to} key={index}>
              {myItem.children}
            </NavLinkComponent>
          ))} */}
        {/* regular user */}
        {loggedIn && !userData.isAdmin
          ? loggedInLinks.map((myItem, index) => (
              <NavLinkComponent to={myItem.to} key={index}>
                {myItem.children}
              </NavLinkComponent>
            ))
          : null}
        {/* admin user */}
        {loggedIn && userData.isAdmin
          ? isAdminHeader.map((myItem, index) => (
              <NavLinkComponent to={myItem.to} key={index}>
                {myItem.children}
              </NavLinkComponent>
            ))
          : null}
      </div>
    </div>
  );
};

export default Links;
