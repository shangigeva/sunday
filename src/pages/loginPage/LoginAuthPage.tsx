import React from "react";
import { LoginPage } from "./LoginPage";

const LoginAuthPage = () => {
  return (
    <>
      <div className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-[url('/assets/images/blob-bgc.png')] bg-no-repeat bg-cover" />
          <div className="z-20 flex items-center text-lg font-medium">
            Sunday{" "}
          </div>
          <div className="z-20 mt-auto text-center flex flex-col items-center justify-center h-full">
            <p className="text-4xl font-bold text-black">WELCOME BACK</p>
          </div>
        </div>
        <div className="lg:p-8 md:p-8 pt-40">
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
