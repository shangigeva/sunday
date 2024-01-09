import React from "react";
import MailIcon from "@mui/icons-material/Mail";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Button } from "@mui/material";
const FooterComponent = () => {
  return (
    <footer>
      <div className="footer p-5 items-center bg-gray-200 text-base-content">
        <nav>
          <header className="footer-title">Contact</header>
          <p className="flex text-xs text-black font-bold ">
            <MailIcon />
            <a href="#email">shanig7@gmail.com</a>
          </p>
          <p className="flex text-xs text-black font-bold">
            <LocalPhoneIcon />
            <span>054-4655700</span>
          </p>
          <p className="flex text-xs text-black font-bold">
            <LocationOnIcon />
            <span>Ness-Zionns</span>
          </p>
        </nav>
        <nav>
          <header className="footer-title">Company</header>
          <a className="link link-hover">Home</a>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">My tasks</a>
        </nav>
        <nav>
          <img
            src="../../assets/images/sundayLogo.png"
            alt="Sunday Logo"
            style={{ width: "90px", height: "40px" }}
          ></img>
        </nav>
      </div>
      <div className="bg-gray-300 text-black">
        <p className="text-sm text-center">
          ©2024, SUNDAY All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default FooterComponent;
