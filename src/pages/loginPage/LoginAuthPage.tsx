import React from "react";
import { LoginPage } from "./LoginPage";

const LoginAuthPage = () => {
  return (
    <>
      <div className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-gradient-to-r from-rose-300 to-turquoise-500" />
          <div className="z-20 flex items-center text-lg font-medium">
            Sunday{" "}
          </div>
          <div className="z-20 mt-auto text-center flex flex-col items-center justify-center h-full">
            <p className="text-4xl font-bold text-white">WELCOME BACK</p>
          </div>
          <div className="absolute bottom-0 left-0 right-0">
            <svg
              className="wave-svg"
              viewBox="0 0 1440 320"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#F0AB78"
                fillOpacity="1"
                d="M0,96L60,74.7C120,53,240,11,360,37.3C480,64,600,160,720,186.7C840,213,960,171,1080,149.3C1200,128,1320,128,1380,128L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
              ></path>
            </svg>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Login </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email and password below to login to your account
              </p>
            </div>
            <LoginPage />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginAuthPage;
