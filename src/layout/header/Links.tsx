import React from "react";
import { useSelector } from "react-redux";
import { loggedInLinks, loggedOutLinks } from "../myLinks";
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
        {/* regular user */}
        {loggedIn && !userData.isAdmin
          ? loggedInLinks.map((myItem, index) => (
              <NavLinkComponent to={myItem.to} key={index}>
                {myItem.children}
              </NavLinkComponent>
            ))
          : null}
        {/* admin user */}
        {/* {loggedIn && userData.isAdmin
          ? isAdmin.map((myItem,index) => (
              <NavLinkComponent to={myItem.to} key={index}>
                {myItem.children}
              </NavLinkComponent>
            ))
          : null} */}
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
