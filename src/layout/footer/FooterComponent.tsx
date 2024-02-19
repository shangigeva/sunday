import React from "react";
import MailIcon from "@mui/icons-material/Mail";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ROUTES from "@/Routes/ROUTES";
import LinksFooter from "./LinksFooter";

const FooterComponent = () => {
  const navigate = useNavigate();
  return (
    <footer className="bg-slate-50 pא-8">
      <div className="flex justify-between items-center px-6">
        <div>
          <header className="text-lg font-semibold mb-2">Contact</header>
          <p className="flex items-center text-sm text-gray-700 mb-2">
            <MailIcon className="mr-2" />
            <a href="#email" className="hover:underline">
              shanig7@gmail.com
            </a>
          </p>
          <p className="flex items-center text-sm text-gray-700 mb-2">
            <LocalPhoneIcon className="mr-2" />
            <span>054-4655700</span>
          </p>
          <p className="flex items-center text-sm text-gray-700 mb-2">
            <LocationOnIcon className="mr-2" />
            <span>Ness-Zionna</span>
          </p>
        </div>
        <LinksFooter />
        <div>
          <img
            src="../../assets/images/logo.jpg"
            alt="Sunday Logo"
            style={{ width: "90px", height: "40px" }}
          ></img>
        </div>
      </div>
      <div className="bg-[#9484ff0d] text-center py-2">
        <p className="text-sm text-gray-800">
          ©2024 SUNDAY All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default FooterComponent;
