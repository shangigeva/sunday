import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ModeToggle } from "@/components/ModeToggle";
import { useSelector } from "react-redux";
import { RootStateType } from "@/store/bigPie";
import Links from "./Links";
import axios from "axios";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import ROUTES from "@/Routes/ROUTES";
import { IUser } from "@/lib/types";
import { getInitials } from "@/lib/utils";

const HeaderComponent = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState<IUser | undefined>(undefined);
  const loggedIn: boolean = useSelector(
    (bigPie: RootStateType) => bigPie.auth.loggedIn
  );
  console.log(loggedIn);

  const userData = useSelector((bigPie: RootStateType) => bigPie.auth.userData);
  console.log(userData?.payload.isAdmin);
  useEffect(() => {
    console.log("this is the userData:", userData);

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
  }, [userData]);

  const token = localStorage.getItem("token");
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

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
    <div className="navbar bg-slate-50">
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
              <a>Item 3</a>
            </li>
          </ul>
        </div>
        {loggedIn ? (
          <a
            className="btn btn-ghost text-xl "
            onClick={() => navigate(ROUTES.TASKS)}
          >
            <img
              src="../../assets/images/logo.jpg"
              alt="Sunday Logo"
              style={{ width: "90px", height: "40px" }}
            ></img>
          </a>
        ) : (
          <a
            className="btn btn-ghost text-xl "
            onClick={() => navigate(ROUTES.HOME)}
          >
            <img
              src="../../assets/images/logo.jpg"
              alt="Sunday Logo"
              style={{ width: "90px", height: "40px" }}
            ></img>
          </a>
        )}
      </div>
      <div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 ">
            <Links />
          </ul>
        </div>
      </div>
      <div className="navbar-end">
        <div className="flex items-center relative">
          {loggedIn && (
            <input
              type="text"
              value={searchQuery}
              placeholder="Search"
              className=" relative bg-center w-10 h-10 rounded-full p-2 cursor-pointer border-[1px] border-white overflow-hidden transition-all duration-500 bg-no-repeat focus:w-48 pl-8 focus:outline-none focus:bg-left  focus:border-black hover:border-black"
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
                <AvatarFallback className="bg-[#F1C2D9] text-primary">
                  {user && getInitials(user.firstName, user.lastName)}
                </AvatarFallback>
              </Avatar>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a
                  className="justify-between"
                  onClick={() => navigate(ROUTES.PROFILE)}
                >
                  Profile
                </a>
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
