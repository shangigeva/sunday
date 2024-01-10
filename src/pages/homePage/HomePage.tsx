import React from "react";
import "./ui/HomePage.css";
import { useNavigate } from "react-router-dom";
import ROUTES from "@/Routes/ROUTES";
import PhoneIcon from "@mui/icons-material/Phone";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import HeaderComponent from "@/layout/header/HeaderComponent";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col justify-center items-center font-lato">
      {/* Section 1 */}
      <div className="flex justify-center mb-8 items-center gap-8 p-8 rounded-lg shadow-lg">
        <div className="flex flex-col items-center justify-center p-8 rounded-lg">
          <p className="text-lg text-center text-gray-700 max-w-screen-md mx-auto p-5 leading-relaxed">
            <strong className="text-[#007bff]">SUNDAY</strong> is the budding
            platform designed for visionary teams. While we're just setting our
            sails, our commitment is unwavering. Aiming to be the go-to solution
            for teams seeking intuitive collaboration, meticulous planning, and
            transformative project management.
          </p>
          <div className="mt-6">
            <button
              className="bg-[#59D7D6] hover:bg-[#8ABBF6] text-white py-2 px-6 rounded-md shadow-md"
              onClick={() => navigate(ROUTES.REGISTER)}
            >
              Get Started
            </button>
            <p className="mt-4 text-gray-600">
              Already have an account?
              <a
                onClick={() => navigate(ROUTES.LOGIN)}
                className="text-[#59D7D6] hover:underline cursor-pointer text-center"
              >
                Login
              </a>
            </p>
          </div>
        </div>
        <img
          src="/assets/images/errorImage.jpg"
          alt="Example 1"
          className="w-[40rem] h-[30rem] rounded-lg shadow-lg"
        />
      </div>
      {/* Section 2 */}
      <div className="flex justify-center mb-8 items-center gap-8 p-8 rounded-lg shadow-lg">
        <div className="flex flex-col items-center justify-center p-8 rounded-lg ">
          <h1 className="text-3xl mb-4 font-bold text-[#8ABBF6]">
            About SUNDAY
          </h1>
          <p className="text-lg text-center text-gray-700 max-w-screen-md mx-auto p-5 leading-relaxed">
            SUNDAY is a powerful task management platform designed to streamline
            your workflow, enhance collaboration, and boost productivity.
          </p>
          <h2 className="text-2xl mt-6 mb-3 font-semibold text-[#8ABBF6]">
            Why SUNDAY?
          </h2>
          <ul className="list-disc list-inside mb-6">
            <li className="text-gray-700 mb-2">Effortlessly organize tasks</li>
            <li className="text-gray-700 mb-2">
              Enhanced collaboration features
            </li>
            <li className="text-gray-700 mb-2">
              Real-time updates and tracking
            </li>
            <li className="text-gray-700 mb-2">
              Customizable workflows and views
            </li>
          </ul>
        </div>
        <img
          src="/assets/images/404img.jpg"
          alt="TaskMaster Interface"
          className="w-[40rem] h-[30rem] rounded-lg shadow-lg"
        />
      </div>
      {/* Support Section */}
      <div className="support-section bg-white p-8 flex flex-col items-center justify-center text-center">
        <div className="support-info">
          <div className="details-area flex items-center">
            <img
              src="/assets/images/connectImage.png"
              alt="connect details image"
              className="connectImage w-3/6 ml-5 h-auto"
            />
            <div className="support-icons flex flex-col items-start ml-4">
              <h3 className="text-2xl font-semibold mb-4">
                Supporting Your Growth Every Step of the Way
              </h3>
              <p className="text-gray-600 mb-6">
                Our support superheroes are just a click away to help you
                maximize your experience with SUNDAY, allowing you to focus on
                unlimited work.
              </p>
              <div className="supportDiv flex">
                <div className="icon-container font-thin flex-col bg-[#8abbf669] flex justify-center items-center m-1 p-4 rounded-md h-36 hover:bg-[#8abbf6] transition-background-color duration-300 ease-in-out">
                  <PhoneIcon />
                  <p className="mt-2">24/7 support anytime, anywhere</p>
                </div>
                <div className="icon-container font-thin flex-col bg-[#8abbf669] flex justify-center items-center m-1 p-4 rounded-md h-36 hover:bg-[#8abbf6] transition-background-color duration-300 ease-in-out">
                  <AccessTimeIcon />
                  <p className="mt-2">Efficient and Fast Response</p>
                </div>
                <div className="icon-container font-thin flex-col bg-[#8abbf669] flex justify-center items-center m-1 p-4 rounded-md h-36 hover:bg-[#8abbf6] transition-background-color duration-300 ease-in-out">
                  <ConnectWithoutContactIcon />
                  <p className="mt-2">Multiple Ways to Connect</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
