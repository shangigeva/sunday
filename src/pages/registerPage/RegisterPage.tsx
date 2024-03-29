import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icons } from "../loginPage/icons";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";
import ROUTES from "@/Routes/ROUTES";
import { useNavigate } from "react-router-dom";
import { RegisterValidation } from "@/validation/registerValidation";
import axios from "axios";
import Requirements from "./ui/Requirements";
import { UserRegister } from "@/lib/types";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}
export function RegisterPage({ className, ...props }: UserAuthFormProps) {
  const [errorsState, setErrorsState] = React.useState<Record<
    string,
    string
  > | null>(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [register, setRegister] = React.useState<UserRegister>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
  });
  const passwordRef = React.useRef<HTMLInputElement>(null);

  console.log(errorsState);

  const [validationErrors, setValidationErrors] = React.useState<Record<
    string,
    string
  > | null>(null);
  console.log(validationErrors);

  const handleInputsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegister((currentState) => ({
      ...currentState,
      [e.target.id]: e.target.value,
    }));
    setValidationErrors((currentErrors) => ({
      ...currentErrors,
    }));
  };
  const handleButtonSubmit = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    try {
      event.preventDefault();
      const joiResponse = RegisterValidation(register);
      if (Array.isArray(joiResponse) && joiResponse.length > 0) {
        const newErrors = joiResponse.reduce(
          (acc: Record<string, string>, error: any) => {
            acc[error.path[0]] = error.message;
            return acc;
          },
          {}
        );
        setErrorsState(newErrors);
        return;
      }
      console.log(joiResponse);
      setErrorsState(joiResponse);

      if (joiResponse) return;
      let { data } = await axios.post("/users/register", register);
      // storeToken(data, rememberMe);
      toast.success("You sign in successfully, please login", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log("Successfully sign in:", data);
      // autoLogin(true);
      navigate(ROUTES.LOGIN);
    } catch (err) {
      console.log("Please try again", err);
      toast.error("Unable to delete card", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="name">
              first name
            </Label>
            <Input
              id="firstName"
              placeholder="first name"
              disabled={isLoading}
              onChange={handleInputsChange}
            />{" "}
            {errorsState?.firstName ? (
              <span className="text-error">{errorsState.firstName}</span>
            ) : null}
            <Label className="sr-only" htmlFor="email">
              last name
            </Label>
            <Input
              id="lastName"
              placeholder="last name"
              disabled={isLoading}
              onChange={handleInputsChange}
            />{" "}
            {errorsState?.lastName ? (
              <span className="text-error">{errorsState.lastName}</span>
            ) : null}
            <Label className="sr-only" htmlFor="number">
              phone number
            </Label>
            <Input
              id="phone"
              placeholder="phone number"
              disabled={isLoading}
              onChange={handleInputsChange}
            />{" "}
            {errorsState?.phone ? (
              <span className="text-error">{errorsState.phone}</span>
            ) : null}
            <Label className="sr-only" htmlFor="n">
              Email
            </Label>
            <Input
              id="email"
              placeholder="mail"
              type="email"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              onChange={handleInputsChange}
            />{" "}
            {errorsState?.email ? (
              <span className="text-error">{errorsState.email}</span>
            ) : null}
            <Label className="sr-only" htmlFor="number">
              password{" "}
            </Label>
            <Input
              ref={passwordRef}
              id="password"
              placeholder="password"
              type="password"
              disabled={isLoading}
              onChange={handleInputsChange}
            />
            {errorsState?.password ? (
              <span className="text-error">{errorsState.password}</span>
            ) : null}
            <Requirements passwordRef={passwordRef} />
          </div>
          <Button
            disabled={isLoading}
            onClick={handleButtonSubmit}
            className=" bg-[#9584FF]"
          >
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign up
          </Button>
        </div>
      </form>
    </div>
  );
}
