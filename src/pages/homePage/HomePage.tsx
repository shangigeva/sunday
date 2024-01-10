import React from "react";
import "./ui/HomePage.css";
import { useNavigate } from "react-router-dom";
import ROUTES from "@/Routes/ROUTES";
import PhoneIcon from "@mui/icons-material/Phone";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container bg-gray-50 min-h-screen flex flex-col justify-center items-center  font-lato">
      <div className="aboutDiv flex justify-center mb-8 items-center gap-3">
        <p className="intro-text font-etna text-lg text-center text-gray-700 max-w-screen-md mx-auto p-5 leading-relaxed">
          {" "}
          <strong className="text-[#007bff]">SUNDAY</strong> is the budding
          platform designed for visionary teams. While we're just setting our
          sails, our commitment is unwavering. SUNDAY aims to be the go-to
          solution for teams seeking intuitive collaboration, meticulous
          planning, and transformative project management.
        </p>

        <img
          src="/assets/images/404img.jpg"
          alt="Example 1"
          className="w-[40rem] h-[30rem]"
        />
      </div>
      <div className="image-gallery flex mb-8">
        <img
          src="/assets/images/404img.jpg"
          alt="Example 1"
          className="rounded-lg shadow-md mr-4"
        />
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius quia
          cupiditate provident quos quam aut culpa id soluta doloribus inventore
          numquam nesciunt aperiam placeat debitis, excepturi impedit blanditiis
          maiores sunt. Voluptas sed eum ea quisquam quaerat corporis dolor quod
          modi consequuntur? Ut distinctio temporibus beatae libero consequuntur
          sit quam reiciendis, tempore officiis iste ratione perferendis ducimus
          facere quia sequi cum, modi id, odit ea ab amet dignissimos. Fugit
          mollitia quae totam reiciendis minima ipsa tenetur praesentium. Vitae
          impedit rem deserunt velit perferendis aliquam, eveniet sunt assumenda
          mollitia cupiditate, ullam tempora id incidunt tempore? Natus, eos
          officia error maxime qui ducimus eum tenetur. Accusamus reprehenderit
          explicabo dolore dolorem aliquam, illo, sit omnis veritatis odio
          doloribus natus atque distinctio, sequi esse maxime in expedita
          obcaecati. Earum nihil sapiente accusantium mollitia obcaecati placeat
          veniam, laborum ipsa maiores cumque tenetur blanditiis eveniet hic
          perferendis debitis numquam iusto? Omnis error, voluptatem placeat
          repellat aliquam ut!
        </div>
      </div>
      <div className="landing-content text-center">
        <h2 className="text-3xl font-semibold mb-4">About TaskMaster</h2>
        <p className="text-lg text-gray-700 mb-6">
          TaskMaster is a powerful task management platform designed to
          streamline your workflow, enhance collaboration, and boost
          productivity.
        </p>
        <h3 className="text-2xl font-semibold mb-2">Why TaskMaster?</h3>
        <ul className="text-left list-disc pl-5 mb-6">
          <li>Effortlessly organize tasks</li>
          <li>Enhanced collaboration features</li>
          <li>Real-time updates and tracking</li>
          <li>Customizable workflows and views</li>
        </ul>
        <button
          className="start-button bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded"
          onClick={() => navigate(ROUTES.REGISTER)}
        >
          Get Started
        </button>
        <p className="mt-4">
          Already have an account?{" "}
          <a
            onClick={() => navigate(ROUTES.LOGIN)}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            Login
          </a>
        </p>
      </div>{" "}
      <div className="support-section bg-gradient-to-b from-[#f9f9f9] to-[#dbdada] p-8 flex flex-col items-center justify-center text-center">
        <div className="support-info ">
          <div className="details-area flex items-center ">
            <img
              src="/assets/images/connectImage.png"
              alt="connect details image"
              className="connectImage w-3/6 ml-5 h-auto"
            />
            <div className="support-icons flex flex-col items-start ml-4 ">
              {" "}
              <h3 className="text-2xl font-semibold mb-4 ">
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
                <div className="icon-container font-thin flex-col bg-[#8abbf669] flex justify-center items-center m-1 p-4 rounded-md h-36 hover:bg-[#8abbf6] transition-background-color duration-300 ease-in-out ">
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
