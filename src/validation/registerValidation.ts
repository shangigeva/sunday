import Joi from "joi";
import validation from "./validation";
interface RegisterInput {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
}
const registerSchema = Joi.object({
  firstName: Joi.string().min(2).max(256).required(),
  lastName: Joi.string().min(2).max(256).required(),
  phone: Joi.string()
    .min(9)
    .max(11)
    .pattern(/^\+?(972|0)(\-)?0?(([23489]{1}\d{7})|[5]{1}\d{8})$/)
    .messages({
      "string.pattern.base": "Phone number is not valid",
      "string.empty": "Phone is not allowed to be empty",
    })
    .required(),
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

const RegisterValidation = (inputToCheck: RegisterInput) =>
  validation(registerSchema, inputToCheck);

export { RegisterValidation };
