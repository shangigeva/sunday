import React, { ReactNode } from "react";
import { NavLink } from "react-router-dom";

interface NavLinkComponentProps {
  to: string;
  children: ReactNode;
}

const NavLinkComponent: React.FC<NavLinkComponentProps> = ({
  to,
  children,
}) => {
  return (
    <NavLink
      to={to}
      style={{
        textDecoration: "none",
        color: "inherit",
        padding: "8px 16px",
        fontSize: "0.9rem",
        fontWeight: 500,
      }}
    >
      {children}
    </NavLink>
  );
};

export default NavLinkComponent;
