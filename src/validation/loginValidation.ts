import Joi from "joi";
import validation from "./validation";
interface LoginInput {
  email: string;
  password: string;
}
const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string()
    .pattern(
      new RegExp(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9].*[0-9].*[0-9].*[0-9])(?=.*[!@%$#^&*-_*(])[A-Za-z0-9!@%$#^&*-_*(]{8,}$/
      )
    )
    .messages({
      "string.pattern.base": "the password should be...",
      "string.empty":
        "password must be filled with something that you will forget",
    })
    .min(8)
    .max(20)
    .required(),
});

const loginValidation = (inputToCheck: LoginInput) =>
  validation(loginSchema, inputToCheck);

export { loginValidation };
