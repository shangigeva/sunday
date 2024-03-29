"use client";

import * as React from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icons } from "./icons";
import { Label } from "@/components/ui/label";
import ROUTES from "@/Routes/ROUTES";
import { useNavigate } from "react-router-dom";
import { loginValidation } from "@/validation/loginValidation";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import useAutoLogin from "@/hooks/useAutoLogin";
import { storeToken } from "@/service/storageService";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function LoginPage({ className, ...props }: UserAuthFormProps) {
  const [emailValue, setEmailValue] = useState<string>("");
  const [passwordValue, setPasswordValue] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [errorsState, setErrorsState] = useState<Record<string, string> | null>(
    null
  );
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const autoLogin = useAutoLogin();
  // const handleButtonSubmit = async () => {
  //   try {
  //     const joiResponse = loginValidation({
  //       email: emailValue,
  //       password: passwordValue,
  //     });
  //     setErrorsState(joiResponse);
  //     if (joiResponse) return;
  //     let { data } = await axios.post("/users/login", {
  //       email: emailValue,
  //       password: passwordValue,
  //     });
  //     // const token = data.token;

  //     storeToken(data.jwt, rememberMe);
  //     console.log(rememberMe);
  //     console.log(data.jwt);

  //     toast.success("You logged in successfully", {
  //       position: "top-center",
  //       autoClose: 1000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //     });
  //     console.log("Successfully logged in:", data);
  //     autoLogin(true);
  //     navigate(ROUTES.TASKS);
  //   } catch (err) {
  //     toast.error("plese try again", {
  //       position: "top-center",
  //       autoClose: 2000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //     });
  //   }
  // };
  const handleEmailInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value);
  };
  const handlePasswordInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordValue(e.target.value);
  };
  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);
    try {
      const joiResponse = loginValidation({
        email: emailValue,
        password: passwordValue,
      });
      setErrorsState(joiResponse);
      if (joiResponse) return;
      let { data } = await axios.post("/users/login", {
        email: emailValue,
        password: passwordValue,
      });
      // const token = data.token;

      storeToken(data.jwt, rememberMe);
      console.log(rememberMe);
      console.log(data.jwt);

      toast.success("You logged in successfully", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log("Successfully logged in:", data);
      await autoLogin(true);
      navigate(ROUTES.TASKS);
    } catch (err) {
      toast.error("plese try again", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setTimeout(() => setIsLoading(false), 1000);
    }
  }
  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="mail@mail.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              onChange={handleEmailInputChange}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="Password">
              Password
            </Label>
            <Input
              id="Password"
              placeholder="password"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={isLoading}
              onChange={handlePasswordInputChange}
            />
          </div>
          <Button
            // onClick={handleButtonSubmit}
            disabled={isLoading}
            className=" bg-[#9584FF]"
          >
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In
          </Button>
        </div>
      </form>
    </div>
  );
}
