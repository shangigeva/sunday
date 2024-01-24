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
    <NavLink className="text-primary" to={to}>
      {children}
    </NavLink>
  );
};

export default NavLinkComponent;
