import React, { useEffect, useState } from "react";
import myLinks from "../myLinks";
import { useLocation, useNavigate } from "react-router-dom";
import { ModeToggle } from "@/components/ModeToggle";
import SearchIcon from "@mui/icons-material/Search";
const HeaderComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

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
        <a className="btn btn-ghost text-xl">
          <img
            src="../../assets/images/sundayLogo.png"
            alt="Sunday Logo"
            style={{ width: "90px", height: "40px" }}
          ></img>
        </a>{" "}
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {/* <li>
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
          </li> */}{" "}
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
      </div>
      <div className="navbar-end">
        <div className="flex items-center relative">
          {/* <input
            type="text"
            placeholder="Search"
            className="text-xs h-6 w-36 rounded-full pl-10 transition-all duration-500 cursor-pointer border-b-[1px] border-white  hover:border-black focus:border-black focus:pl-20 focus:text-black focus:outline-none "
            
          />
          <button className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
            <SearchIcon />
          </button> */}
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchInputChange}
            placeholder="Search"
            className="relative bg-center w-10 h-10 rounded-full p-2 cursor-pointer border-[1px] border-white overflow-hidden transition-all duration-500 bg-no-repeat focus:w-48 pl-8 focus:outline-none focus:bg-left  focus:border-black hover:border-black"
            style={{
              backgroundImage: "url('/public/assets/images/search.png')",
              backgroundSize: "20px",
            }}
          />
        </div>

        <ModeToggle />
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
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
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;
