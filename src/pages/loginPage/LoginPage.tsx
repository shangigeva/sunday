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
  // const autoLogin = useAutoLogin();
  const handleButtonSubmit = async () => {
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
      // storeToken(data, rememberMe);
      toast.success("You logged in successfully 🎉", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log("Successfully logged in:", data);
      // autoLogin(true);
      navigate(ROUTES.HOME);
    } catch (err) {
      console.log("err from login", err);
    }
  };
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
    console.log("Attempting login...");
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
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
              placeholder="name@example.com"
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
              placeholder="Password"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={isLoading}
              onChange={handlePasswordInputChange}
            />
          </div>
          <Button onClick={handleButtonSubmit} disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "}
        Github
      </Button>
    </div>
  );
}
