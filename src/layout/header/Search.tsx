import React from "react";
import MailIcon from "@mui/icons-material/Mail";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
const FooterComponent = () => {
  return (
    <footer className="w-full py-2 px-4 bg-sky-700">
      <h2 className="sr-only">Footer</h2>
      <div className="mx-auto max-w-7xl flex flex-col items-center text-gray-200">
        <div className="w-full flex flex-col md:flex-row flex-wrap justify-between items-center">
          <div className="py-4 px-2 flex">
            <img
              src="../../assets/images/sundayLogo.png"
              alt="Sunday Logo"
              style={{ width: "90px", height: "40px" }}
            ></img>{" "}
            <div className="px-2 flex flex-col">
              <p className="flex text-xs text-gray-300 font-medium tracking-wide">
                <MailIcon />
                <a href="#email">shanig7@gmail.com</a>
              </p>
              <p className="flex text-xs text-gray-300 font-bold">
                <LocalPhoneIcon />
                <span>054-4655700</span>
              </p>
              <p className="flex text-xs text-gray-300 font-bold">
                <LocationOnIcon />
                <span>Ness-Zionns</span>
              </p>
            </div>
          </div>
          <nav className="py-4 px-2 flex flex-wrap justify-center list-none">
            <li className="p-3 hover:font-semibold">
              <a href="#link">Home</a>
            </li>
            <li className="p-3 hover:font-semibold">
              <a href="#link">About</a>
            </li>
          </nav>
        </div>
        <p className="pt-10 text-sm text-gray-300 text-center">
          ©2024, SUNDAY All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default FooterComponent;
