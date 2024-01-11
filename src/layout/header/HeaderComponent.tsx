import React, { useEffect, useState } from "react";
import myLinks, {
  isAdminHeader,
  loggedInLinks,
  loggedOutLinks,
} from "../myLinks";
import { useLocation, useNavigate } from "react-router-dom";
import { ModeToggle } from "@/components/ModeToggle";
import { useSelector } from "react-redux";
import { RootStateType } from "@/store/bigPie";
import data from "@/pages/tasks/data/tasks";
import Links from "./Links";
import axios from "axios";
import { UserData } from "@/hooks/useAutoLogin";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
type IUser = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  isAdmin?: boolean;
  createdAt?: Date;
  _id?: string;
  failedLoginAttempts: number;
  lastFailedLogin: Date;
};

const HeaderComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState<IUser | undefined>(undefined);
  const loggedIn: boolean = useSelector(
    (bigPie: RootStateType) => bigPie.auth.loggedIn
  );
  const userData = useSelector((bigPie: RootStateType) => bigPie.auth.userData);
  console.log(userData?.payload.isAdmin);

  useEffect(() => {
    if (loggedIn && userData && userData.payload) {
      axios
        .get(`/users/${userData.payload._id}`)
        .then(({ data }) => {
          setUser(data.user);
          console.log(data);
        })

        .catch((err) => {
          console.error("Error fetching user data", err);
        });
    }
  }, [loggedIn, userData]);

  const token = localStorage.getItem("token");
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0).toUpperCase()}${lastName
      .charAt(0)
      .toUpperCase()}`;
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const filterParam = searchParams.get("filter");
    if (filterParam) {
      setSearchQuery(filterParam);
    }
  }, [location.search]);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = () => {
    navigate(`/?filter=${searchQuery}`);
  };
  console.log(userData);
  // console.log(isAdmin);

  // logout
  const handleMenu = (
    item: string,
    token: string | null,
    navigate: Function
  ) => {
    setAnchorEl(null);
    handleMobileMenuClose();
    if (item === "Logout" && token) {
      localStorage.removeItem("token");
      navigate("/");
      window.location.reload();
    }
  };
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          {" "}
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Parent</a>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl ">
          <img
            src="../../assets/images/sundayLogo.png"
            alt="Sunday Logo"
            style={{ width: "90px", height: "40px" }}
          ></img>
        </a>{" "}
      </div>
      <div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              {/* <details>
                <summary>Parent</summary>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </details> */}
            </li>
            <Links />
          </ul>
        </div>
        <div>
          {/* {loggedIn
            ? loggedInLinks.map((link, index) => (
                <a
                  key={index}
                  className={`${
                    link.to === location.pathname
                      ? "bg-primary text-secondary"
                      : null
                  }`}
                  onClick={() => navigate(link.to)}
                >
                  {link.children}
                </a>
              ))
            : null} */}
        </div>
      </div>

      {/* <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <details>
              <summary>Parent</summary>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </details>
          </li>
          {myLinks.map((link, index) => (
            <li key={index}>
              <a
                className={`${
                  link.to === location.pathname
                    ? "bg-primary text-secondary"
                    : null
                }`}
                onClick={() => navigate(link.to)}
              >
                {link.children}
              </a>
            </li>
          ))}
        </ul>
      </div> */}
      <div className="navbar-end">
        <div className="flex items-center relative">
          {loggedIn && (
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchInputChange}
              placeholder="Search"
              className="relative bg-center w-10 h-10 rounded-full p-2 cursor-pointer border-[1px] border-white overflow-hidden transition-all duration-500 bg-no-repeat focus:w-48 pl-8 focus:outline-none focus:bg-left  focus:border-black hover:border-black"
              style={{
                backgroundImage: "url('/assets/images/search.png')",
                backgroundSize: "20px",
              }}
            />
          )}
        </div>

        <ModeToggle />
        {loggedIn && (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <Avatar>
                <AvatarFallback className="bg-[#F1C2D9]">
                  {user && getInitials(user.firstName, user.lastName)}
                </AvatarFallback>
              </Avatar>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a
                  onClick={() => {
                    handleMenu("Logout", token, navigate);
                  }}
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderComponent;
